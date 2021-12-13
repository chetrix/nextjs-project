import { Fragment } from "react/cjs/react.production.min";
import MainHeader from "./main-header";

export default function Layout(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}
