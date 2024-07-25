import { cn } from "../";
import { cva } from "class-variance-authority";
import * as React from "react";
import type { IconType } from "./types";
import { useStepper } from "./use-stepper";
import { Icons } from "@knowingly/icons";

interface StepIconProps {
	isCompletedStep?: boolean;
	isCurrentStep?: boolean;
	isError?: boolean;
	isLoading?: boolean;
	isKeepError?: boolean;
	icon?: IconType;
	index?: number;
	checkIcon?: IconType;
	errorIcon?: IconType;
}

const iconVariants = cva("", {
	variants: {
		size: {
			sm: "size-4",
			md: "size-4",
			lg: "size-5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>(
	(props, ref) => {
		const { size } = useStepper();

		const {
			isCompletedStep,
			isCurrentStep,
			isError,
			isLoading,
			isKeepError,
			icon: CustomIcon,
			index,
			checkIcon: CustomCheckIcon,
			errorIcon: CustomErrorIcon,
		} = props;

		const Icon = React.useMemo(
			() => (CustomIcon ? CustomIcon : null),
			[CustomIcon],
		);

		const ErrorIcon = React.useMemo(
			() => (CustomErrorIcon ? CustomErrorIcon : null),
			[CustomErrorIcon],
		);

		const Check = React.useMemo(
			() => (CustomCheckIcon ? CustomCheckIcon : Icons.check),
			[CustomCheckIcon],
		);

		return React.useMemo(() => {
			if (isCompletedStep) {
				if (isError && isKeepError) {
					return (
						<div key="icon">
							<Icons.x className={cn(iconVariants({ size }))} />
						</div>
					);
				}
				return (
					<div key="check-icon">
						<Check className={cn(iconVariants({ size }))} />
					</div>
				);
			}
			if (isCurrentStep) {
				if (isError && ErrorIcon) {
					return (
						<div key="error-icon">
							<ErrorIcon className={cn(iconVariants({ size }))} />
						</div>
					);
				}
				if (isError) {
					return (
						<div key="icon">
							<Icons.x className={cn(iconVariants({ size }))} />
						</div>
					);
				}
				if (isLoading) {
					return (
						<Icons.loader className={cn(iconVariants({ size }), "animate-spin")} />
					);
				}
			}
			if (Icon) {
				return (
					<div key="step-icon">
						<Icon className={cn(iconVariants({ size }))} />
					</div>
				);
			}
			return (
				<span
					ref={ref}
					key="label"
					className={cn("font-medium text-center text-md")}
				>
					{(index || 0) + 1}
				</span>
			);
		}, [
			isCompletedStep,
			isCurrentStep,
			isError,
			isLoading,
			Icon,
			index,
			Check,
			ErrorIcon,
			isKeepError,
			ref,
			size,
		]);
	},
);

export { StepIcon };
