export const getGradientTheme = (isLight) => {
    return isLight ? ["#e4efe9", "#93a5cf", "#93a5cf"] : ["#485563", "#485563", "#29323c"];
  };
  
  export const getButtonTheme = (isLight) => {
    return isLight ? "#007AFF" : "silver";
  };
  
  export const getTextTheme = (isLight) => {
    return {
      color: isLight ? "white" : "silver",
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "right"
    }
  };