import { Studio } from "sanity";
import config from "./config";

export default function StudioApp() {
  return <Studio config={config} />;
}
