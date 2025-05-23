import { useFormStatus } from "react-dom";
import React from "react";
const { pending } = useFormStatus();

const Submit = () => {
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
};

export default Submit;
