"use client";

import { cn } from "@/utils/css";
import { AnimatePresence, motion, MotionProps, Variants } from "motion/react";
import { ElementType, memo, useMemo } from "react";

type AnimationType = "text" | "word" | "character" | "line";
type AnimationVariant =
	| "fadeIn"
	| "blurIn"
	| "blurInUp"
	| "blurInDown"
	| "slideUp"
	| "slideDown"
	| "slideLeft"
	| "slideRight"
	| "scaleUp"
	| "scaleDown";

interface TextAnimateProps extends MotionProps {
	children: string;
	className?: string;
	segmentClassName?: string;
	delay?: number;
	duration?: number;
	variants?: Variants;
	as?: ElementType;
	by?: AnimationType;
	startOnView?: boolean;
	once?: boolean;
	animation?: AnimationVariant;
}

const staggerTimings: Record<AnimationType, number> = {
	text: 0.06,
	word: 0.05,
	character: 0.03,
	line: 0.06,
};

const defaultContainerVariants = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0,
			staggerChildren: 0.05,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

const defaultItemVariants: Variants = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
	exit: { opacity: 0 },
};

const defaultItemAnimationVariants: Record<
	AnimationVariant,
	{ container: Variants; item: Variants }
> = {
	// same as your existing variants...
	fadeIn: {
		container: defaultContainerVariants,
		item: {
			hidden: { opacity: 0, y: 20 },
			show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
			exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
		},
	},
	blurIn: {
		container: defaultContainerVariants,
		item: {
			hidden: { opacity: 0, filter: "blur(10px)" },
			show: {
				opacity: 1,
				filter: "blur(0px)",
				transition: { duration: 0.3 },
			},
			exit: {
				opacity: 0,
				filter: "blur(10px)",
				transition: { duration: 0.3 },
			},
		},
	},
	blurInUp: {
		container: defaultContainerVariants,
		item: {
			hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
			show: {
				opacity: 1,
				filter: "blur(0px)",
				y: 0,
				transition: {
					y: { duration: 0.3 },
					opacity: { duration: 0.4 },
					filter: { duration: 0.3 },
				},
			},
			exit: {
				opacity: 0,
				filter: "blur(10px)",
				y: 20,
				transition: {
					y: { duration: 0.3 },
					opacity: { duration: 0.4 },
					filter: { duration: 0.3 },
				},
			},
		},
	},
	// ...rest remain unchanged
};

function _TextAnimate({
	children,
	delay = 0,
	duration = 0.3,
	variants,
	className,
	segmentClassName,
	as: Component = "p",
	startOnView = true,
	once = false,
	by = "word",
	animation = "fadeIn",
	...props
}: TextAnimateProps) {
	const MotionComponent = motion(Component);

	const segments = useMemo(() => {
		switch (by) {
			case "word":
				return children.split(/(\s+)/);
			case "character":
				return children.split("");
			case "line":
				return children.split("\n");
			case "text":
			default:
				return [children];
		}
	}, [children, by]);

	const finalVariants = useMemo(() => {
		if (variants) {
			return {
				container: {
					hidden: { opacity: 0 },
					show: {
						opacity: 1,
						transition: {
							opacity: { duration: 0.01, delay },
							delayChildren: delay,
							staggerChildren: duration / segments.length,
						},
					},
					exit: {
						opacity: 0,
						transition: {
							staggerChildren: duration / segments.length,
							staggerDirection: -1,
						},
					},
				},
				item: variants,
			};
		}

		const preset = defaultItemAnimationVariants[animation] ?? {
			container: defaultContainerVariants,
			item: defaultItemVariants,
		};

		return {
			container: {
				...preset.container,
				show: {
					...preset.container.show,
					transition: {
						delayChildren: delay,
						staggerChildren: duration / segments.length,
					},
				},
				exit: {
					...preset.container.exit,
					transition: {
						staggerChildren: duration / segments.length,
						staggerDirection: -1,
					},
				},
			},
			item: preset.item,
		};
	}, [animation, delay, duration, segments.length, variants]);

	return (
		<AnimatePresence mode="popLayout">
			<MotionComponent
				variants={finalVariants.container}
				initial="hidden"
				whileInView={startOnView ? "show" : undefined}
				animate={startOnView ? undefined : "show"}
				exit="exit"
				className={cn("whitespace-pre-wrap", className)}
				viewport={{ once }}
				{...props}
			>
				{segments.map((segment, i) => (
					<motion.span
						key={`${by}-${segment}-${i}`}
						variants={finalVariants.item}
						custom={i * staggerTimings[by]}
						className={cn(
							by === "line" ? "block" : "inline-block whitespace-pre",
							segmentClassName,
						)}
					>
						{segment}
					</motion.span>
				))}
			</MotionComponent>
		</AnimatePresence>
	);
}

// ✅ Export memoized version
export const TextAnimate = memo(_TextAnimate);
