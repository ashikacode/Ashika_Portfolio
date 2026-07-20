import { useEffect, useRef } from "react";
import {
  Engine,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Body,
  type IBodyDefinition,
} from "matter-js";

// ─── Pillar visual config ─────────────────────────────────────────────────────

interface PillarDef {
  label: string;
  borderColor: string;
  textColor: string;
  width: number;
}

const PILLAR_DEFS: PillarDef[] = [
  {
    label: "CREATIVITY",
    borderColor: "hsl(178,60%,50%)",
    textColor: "hsl(178,60%,50%)",
    width: 248,
  },
  {
    label: "EMPATHY",
    borderColor: "hsl(40,33%,88%)",
    textColor: "hsl(40,33%,88%)",
    width: 210,
  },
  {
    label: "RIGOR",
    borderColor: "hsl(178,60%,50%)",
    textColor: "hsl(178,60%,50%)",
    width: 166,
  },
];

const BODY_HEIGHT = 66;
const BODY_CORNER_RADIUS = 10;
const BODY_FILL = "rgba(18, 6, 13, 0.84)";
const PHYSICS_OPTIONS: IBodyDefinition = {
  restitution: 0.6,
  friction: 0.1,
  frictionAir: 0.012,
  density: 0.002,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Draws a rounded rectangle centred at (0, 0) on the given context.
 * Must be called after ctx.save() + ctx.translate(x, y) + ctx.rotate(angle).
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  r: number
) {
  const hw = w / 2;
  const hh = h / 2;
  ctx.beginPath();
  ctx.moveTo(-hw + r, -hh);
  ctx.lineTo(hw - r, -hh);
  ctx.arcTo(hw, -hh, hw, -hh + r, r);
  ctx.lineTo(hw, hh - r);
  ctx.arcTo(hw, hh, hw - r, hh, r);
  ctx.lineTo(-hw + r, hh);
  ctx.arcTo(-hw, hh, -hw, hh - r, r);
  ctx.lineTo(-hw, -hh + r);
  ctx.arcTo(-hw, -hh, -hw + r, -hh, r);
  ctx.closePath();
}

/**
 * fillText with manual letter-spacing, centred at (cx, cy).
 * Uses textAlign="left" internally so each glyph is placed at its left edge,
 * then restores the original alignment after drawing.
 */
function fillTextSpaced(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  spacing: number
) {
  const savedAlign = ctx.textAlign;
  const savedBaseline = ctx.textBaseline;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  const chars = text.split("");
  const widths = chars.map((ch) => ctx.measureText(ch).width);
  const totalW = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);

  let x = cx - totalW / 2;
  chars.forEach((ch, i) => {
    ctx.fillText(ch, x, cy);
    x += widths[i] + spacing;
  });

  ctx.textAlign = savedAlign;
  ctx.textBaseline = savedBaseline;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface PhysicsHeroProps {
  /**
   * Fraction of the container height at which the invisible ground wall sits.
   * Default 1.0 = very bottom of canvas.
   * Pass e.g. 0.66 to leave the bottom third free for overlay text.
   */
  groundRatio?: number;
}

/**
 * Matter.js physics canvas.
 *
 * - Three rigid pillar bodies fall from above and bounce on invisible walls.
 * - Walls dynamically rebuild on window resize.
 * - MouseConstraint lets users click, drag, and flick the pillars.
 * - Canvas is pixel-ratio–aware: no blur on Retina displays.
 * - On touch-primary devices pointer-events is none so snap-scroll still works.
 */
export default function PhysicsHero({ groundRatio = 1.0 }: PhysicsHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let cw = 0;
    let ch = 0;

    // Size the canvas accounting for device pixel ratio
    function applySize() {
      cw = container!.clientWidth;
      ch = container!.clientHeight;
      canvas!.width = cw * dpr;
      canvas!.height = ch * dpr;
      canvas!.style.width = `${cw}px`;
      canvas!.style.height = `${ch}px`;
      // resetTransform clears scale, then re-apply dpr scale
      ctx!.resetTransform();
      ctx!.scale(dpr, dpr);
    }

    applySize();

    // ── Physics engine (no built-in renderer — we draw ourselves) ──────────
    const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });

    let wallBodies: ReturnType<typeof Bodies.rectangle>[] = [];

    function buildWalls(w: number, h: number) {
      // groundRatio controls how far down the virtual floor sits,
      // leaving the remaining fraction free for overlay content.
      const groundY = h * groundRatio;
      const opts = { isStatic: true, label: "wall", friction: 0.3 };
      return [
        Bodies.rectangle(w / 2, groundY + 30, w + 200, 60, opts), // ground
        Bodies.rectangle(-30, h / 2, 60, h + 200, opts),           // left
        Bodies.rectangle(w + 30, h / 2, 60, h + 200, opts),        // right
      ];
    }

    wallBodies = buildWalls(cw, ch);
    Composite.add(engine.world, wallBodies);

    // ── Three pillar bodies ────────────────────────────────────────────────
    const pillarBodies = PILLAR_DEFS.map((def, i) => {
      // Stagger drop positions: left-third, centre, right-third; staggered heights
      const x = cw * (0.2 + i * 0.3);
      const y = -(BODY_HEIGHT * (i + 1) * 2.4);
      return Bodies.rectangle(x, y, def.width, BODY_HEIGHT, {
        ...PHYSICS_OPTIONS,
        label: def.label,
        chamfer: { radius: BODY_CORNER_RADIUS },
      });
    });

    Composite.add(engine.world, pillarBodies);

    // ── Mouse constraint ───────────────────────────────────────────────────
    const mouse = Mouse.create(canvas);
    // Tell Matter.js about DPR so mouse positions map correctly to world space
    mouse.pixelRatio = dpr;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18,
        damping: 0,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);

    // ── Draw loop (manual RAF — avoids a second Runner RAF loop) ──────────
    let rafId = 0;
    let prevTime = 0;

    function drawPillar(body: Matter.Body, def: PillarDef) {
      const { x, y } = body.position;

      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(body.angle);

      drawRoundedRect(ctx!, def.width, BODY_HEIGHT, BODY_CORNER_RADIUS);

      // Background fill
      ctx!.fillStyle = BODY_FILL;
      ctx!.fill();

      // Accent border with very soft glow
      ctx!.strokeStyle = def.borderColor;
      ctx!.lineWidth = 1.5;
      ctx!.shadowColor = def.borderColor;
      ctx!.shadowBlur = 6;
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Label
      ctx!.font = `700 11px 'Space Mono', monospace`;
      ctx!.fillStyle = def.textColor;
      fillTextSpaced(ctx!, def.label, 0, 0, 4);

      ctx!.restore();
    }

    function frame(now: number) {
      const delta = prevTime === 0 ? 16.67 : Math.min(now - prevTime, 50);
      prevTime = now;

      Engine.update(engine, delta);

      ctx!.clearRect(0, 0, cw, ch);

      pillarBodies.forEach((body, i) => drawPillar(body, PILLAR_DEFS[i]));

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    // ── Resize ────────────────────────────────────────────────────────────
    function handleResize() {
      applySize();

      // Rebuild walls for new dimensions
      wallBodies.forEach((w) => Composite.remove(engine.world, w));
      wallBodies = buildWalls(cw, ch);
      Composite.add(engine.world, wallBodies);

      // Clamp pillars that flew off-screen
      pillarBodies.forEach((body) => {
        const { x, y } = body.position;
        const clampedX = Math.max(40, Math.min(cw - 40, x));
        // If a body is off the bottom, respawn it near the top
        const clampedY = y > ch + 200 ? -BODY_HEIGHT * 2 : y;
        Body.setPosition(body, { x: clampedX, y: clampedY });
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      Engine.clear(engine);
      Composite.clear(engine.world, false);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
    >
      <canvas
        ref={canvasRef}
        /*
         * On touch-primary devices (phones/tablets) the canvas must not
         * intercept pointer events, otherwise the snap-scroll gesture is
         * stolen by MouseConstraint and the page can't be scrolled.
         */
        className="physics-canvas"
        style={{ display: "block", position: "absolute", inset: 0 }}
      />
    </div>
  );
}
