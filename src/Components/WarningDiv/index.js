import React from "react";
import waring from "../../assets/images/renewWaring.svg";

export default function WarningDiv({
  header,
  description,
  warningIcon,
  cancelAccountDeletion,
}) {
  const accountDelete = header.includes("Deletion");
  return (
    <div className="RenewWarning">
      <div>
        <img src={!warningIcon && waring} alt="warning" />
        <div>
          <span>{header}</span>
          <p>{description}</p>
        </div>
        {accountDelete && (
          <button onClick={cancelAccountDeletion}>
            Cancel Account Deletion
          </button>
        )}
      </div>
    </div>
  );
}
