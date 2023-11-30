import React from "react";
import { Step, StepsSequenceProps } from "../types";

function StepsSequence({ steps }: StepsSequenceProps) {
    return (
        <div className="steps-sequence">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      );
    };
}

export default StepsSequence;
