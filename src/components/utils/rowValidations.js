export const validateNewRow = (row, existingRows) => {
    const errors = {};
  
    if (!row.user.trim()) errors.user = "User field cannot be empty.";
    if (!row.broker.trim()) errors.broker = "Broker field cannot be empty.";
    if (!row["API key"].trim()) errors["API key"] = "API key field cannot be empty.";
    if (!row["API secret"].trim()) errors["API secret"] = "API secret field cannot be empty.";
  
    if (!row.pnl || isNaN(parseFloat(row.pnl)) || parseFloat(row.pnl) <= 0)
      errors.pnl = "PnL must be a valid number greater than 0.";
    if (!row.margin || isNaN(parseFloat(row.margin)) || parseFloat(row.margin) <= 0)
      errors.margin = "Margin must be a valid number greater than 0.";
    if (!row.max_risk || isNaN(parseFloat(row.max_risk)) || parseFloat(row.max_risk) <= 0)
      errors.max_risk = "Max Risk must be a valid number greater than 0.";
  
    if (existingRows.some((existingRow) => existingRow.user === row.user))
      errors.user = "A row with this user already exists.";
  
    const alphanumericRegex = /^[a-zA-Z0-9_-]{8,32}$/;
    if (!alphanumericRegex.test(row["API key"]))
      errors["API key"] = "API key must be alphanumeric and 8-32 characters long.";
    if (!alphanumericRegex.test(row["API secret"]))
      errors["API secret"] = "API secret must be alphanumeric and 8-32 characters long.";
  
    if (parseFloat(row.max_risk) > parseFloat(row.margin) * 0.2)
      errors.max_risk = "Max Risk cannot exceed 20% of the Margin.";
  
    return errors;
  };
  
  export const validateTable = (rows) => {
    const errors = {};
  
    rows.forEach((row, index) => {
      const rowErrors = validateNewRow(row, rows.filter((_, i) => i !== index));
      if (Object.keys(rowErrors).length > 0) errors[index] = rowErrors;
    });
  
    return errors;
  };
  
  export const hasErrors = (errors) => Object.keys(errors).length > 0;
  