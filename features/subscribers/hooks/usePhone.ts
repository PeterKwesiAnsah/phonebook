import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";

export const usePhone = (init: string | undefined) => {
  const [value, setValue] = React.useState(init);
  const isValidPhone = React.useMemo(
    () => isValidPhoneNumber(value || ""),
    [value]
  );
  return [value, setValue, isValidPhone] as const;
};

//export default usePhone
