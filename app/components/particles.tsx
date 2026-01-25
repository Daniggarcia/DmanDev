"use client";

import React, { useRef, useEffect, useState } from "react";
import { useMousePosition } from "@/util/mouse";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
}

export default function Particles({
	className = "",
	quantity = 30,
	staticity = 50,
	ease = 50,
	refresh = false,
	warp = false,
}: ParticlesProps & { warp?: boolean }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<any[]>([]);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

	// Fix: Use ref to access latest warp state inside closure
	const warpRef = useRef(warp);

	useEffect(() => {
		warpRef.current = warp;
	}, [warp]);

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);
		// Add mouse leave listener to reset center
		const handleMouseLeave = () => {
			mouse.current.x = 0;
			mouse.current.y = 0;
		};
		// Listen on window to catch leaving the page entirely
		window.addEventListener("mouseout", handleMouseLeave);

		return () => {
			window.removeEventListener("resize", initCanvas);
			window.removeEventListener("mouseout", handleMouseLeave);
		};
	}, []);

	useEffect(() => {
		onMouseMove();
	}, [mousePosition.x, mousePosition.y]);

	useEffect(() => {
		initCanvas();
	}, [refresh]);

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	const onMouseMove = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const { w, h } = canvasSize.current;
			const x = mousePosition.x - rect.left - w / 2;
			const y = mousePosition.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.current.x = x;
				mouse.current.y = y;
			}
		}
	};

	type Circle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
		magnetism: number;
		z: number; // For depth/warp effect
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const circleParams = (): Circle => {
		const x = Math.floor(Math.random() * canvasSize.current.w);
		const y = Math.floor(Math.random() * canvasSize.current.h);
		const translateX = 0;
		const translateY = 0;
		const size = Math.floor(Math.random() * 2) + 0.5; // Slightly larger stars
		const alpha = 0;
		const targetAlpha = parseFloat((Math.random() * 0.5 + 0.3).toFixed(1)); // Brighter stars
		const dx = (Math.random() - 0.5) * 0.2;
		const dy = (Math.random() - 0.5) * 0.2;
		const magnetism = 0.1 + Math.random() * 4;
		const z = Math.random() * canvasSize.current.w; // Initial Z depth
		return {
			x,
			y,
			translateX,
			translateY,
			size,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism,
			z
		};
	};

	const drawCircle = (circle: Circle, update = false) => {
		if (context.current) {
			const { x, y, translateX, translateY, size, alpha } = circle;

			if (warpRef.current) {
				// Warp effect: Draw lines radiating from dynamic center
				let cx = canvasSize.current.w / 2;
				let cy = canvasSize.current.h / 2;

				if (mouse.current.x !== 0 || mouse.current.y !== 0) {
					cx += mouse.current.x * 0.5; // Reduced sensitivity (Professional feel)
					cy += mouse.current.y * 0.5;
				}

				// Simple radial warp
				const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
				const angle = Math.atan2(y - cy, x - cx);
				const length = dist * 0.2; // Longer for better center visibility

				const x2 = x + Math.cos(angle) * length;
				const y2 = y + Math.sin(angle) * length;

				context.current.beginPath();
				context.current.moveTo(x, y);
				context.current.lineTo(x2, y2);
				context.current.strokeStyle = `rgba(220, 255, 255, ${alpha})`;
				context.current.lineWidth = size; // Standard width, not excessively thick
				context.current.stroke();
			} else {
				context.current.translate(translateX, translateY);
				context.current.beginPath();
				context.current.arc(x, y, size, 0, 2 * Math.PI);
				context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
				context.current.fill();
				context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
			}

			if (!update) {
				circles.current.push(circle);
			}
		}
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h,
			);
		}
	};

	const drawParticles = () => {
		clearContext();
		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
			const circle = circleParams();
			drawCircle(circle);
		}
	};

	const remapValue = (
		value: number,
		start1: number,
		end1: number,
		start2: number,
		end2: number,
	): number => {
		const remapped =
			((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
		return remapped > 0 ? remapped : 0;
	};

	const animate = () => {
		clearContext();
		circles.current.forEach((circle: Circle, i: number) => {
			if (warpRef.current) {
				// WARP MODE LOGIC
				// Warp movement

				let cx = canvasSize.current.w / 2;
				let cy = canvasSize.current.h / 2;

				// Dynamic center
				if (mouse.current.x !== 0 || mouse.current.y !== 0) {
					cx += mouse.current.x * 0.5;
					cy += mouse.current.y * 0.5;
				}

				const angle = Math.atan2(circle.y - cy, circle.x - cx);
				const speed = 8; // Reduced for smoother travel

				circle.x += Math.cos(angle) * speed;
				circle.y += Math.sin(angle) * speed;

				// ALPHA LOGIC FOR WARP: Based on distance from center
				// This ensures lines are visible almost immediately near the center
				const dist = Math.sqrt((circle.x - cx) ** 2 + (circle.y - cy) ** 2);
				const fadeZone = 100; // Pixels from center to be fully opaque
				circle.alpha = Math.min(dist / fadeZone, 1);

				// Ensure targetAlpha cap (optional, or just go to 1 for brightness)
				if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
				// Actually let's let them be bright:
				// circle.alpha = Math.min(dist / fadeZone, 1); 

				// Reset logic
				const resetDist = 50; // Allow them to spawn even closer
				if (
					circle.x < -resetDist ||
					circle.x > canvasSize.current.w + resetDist ||
					circle.y < -resetDist ||
					circle.y > canvasSize.current.h + resetDist
				) {
					circle.x = cx + (Math.random() - 0.5) * 20; // Spawn closer to single point
					circle.y = cy + (Math.random() - 0.5) * 20;
					circle.alpha = 0;
				}

			} else {
				// NORMAL MODE ALPHA LOGIC (Edge fading)
				const edge = [
					circle.x + circle.translateX - circle.size,
					canvasSize.current.w - circle.x - circle.translateX - circle.size,
					circle.y + circle.translateY - circle.size,
					canvasSize.current.h - circle.y - circle.translateY - circle.size,
				];
				const closestEdge = edge.reduce((a, b) => Math.min(a, b));
				const remapClosestEdge = parseFloat(
					remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
				);
				if (remapClosestEdge > 1) {
					circle.alpha += 0.02;
					if (circle.alpha > circle.targetAlpha) {
						circle.alpha = circle.targetAlpha;
					}
				} else {
					circle.alpha = circle.targetAlpha * remapClosestEdge;
				}

				// Normal movement logic
				circle.x += circle.dx;
				circle.y += circle.dy;
				circle.translateX +=
					(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
					ease;
				circle.translateY +=
					(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
					ease;

				if (
					circle.x < -circle.size ||
					circle.x > canvasSize.current.w + circle.size ||
					circle.y < -circle.size ||
					circle.y > canvasSize.current.h + circle.size
				) {
					circles.current.splice(i, 1);
					const newCircle = circleParams();
					drawCircle(newCircle);
				}
			}

			// Redraw
			if (!warpRef.current || (warpRef.current && circle.x > -100)) {
				drawCircle(
					{
						...circle,
						x: circle.x,
						y: circle.y,
						translateX: circle.translateX,
						translateY: circle.translateY,
						alpha: circle.alpha,
					},
					true,
				);
			}
		});
		window.requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
