import { useEffect } from "react";
import { analytics } from "../firebase";
import { logEvent, Analytics } from "firebase/analytics";

const AnalyticsComponent: React.FC = () => {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view", { page: "home" });
      console.log("Analytics event logged: page_view");
    }
  }, []);

  return <div></div>;
};

export default AnalyticsComponent;