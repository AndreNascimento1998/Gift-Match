import type * as React from "react"

import CheckStepIcon from "@/components/icons/CheckStepIcon"
import LineStepIcon from "@/components/icons/LineStepIcon"
import NumberStepIcon from "@/components/icons/NumberStepIcon"

type StepCountProps = {
    steps: number[] | number
    startAt?: number
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const StepCount = ({
    steps,
    startAt = 1,
    currentStep,
    setCurrentStep,
}: StepCountProps) => {
    const handleClickStep = (step: number) => {
        if (currentStep > step - 1) {
            setCurrentStep(step)
        }
    }

    const normalizedSteps = Array.isArray(steps)
        ? steps
        : Array.from(
              { length: Math.max(0, steps) },
              (_, index) => startAt + index,
          )

    return (
        <div className="flex items-center">
            {normalizedSteps.map((step, index) => (
                <div
                    onClick={() => handleClickStep(step - 1)}
                    className="flex items-center"
                    key={`${step}-${index}`}
                >
                    <span
                        key={
                            step > currentStep ? `num-${step}` : `check-${step}`
                        }
                        className="animate-fade-in"
                    >
                        {step > currentStep ? (
                            <NumberStepIcon
                                numberValue={step}
                                active={step === currentStep + 1 ? true : false}
                            />
                        ) : (
                            <CheckStepIcon className="cursor-pointer" />
                        )}
                    </span>

                    {index !== normalizedSteps.length - 1 ? (
                        <LineStepIcon />
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default StepCount
