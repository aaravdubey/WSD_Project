import { useEffect } from "react";

const Alert = ({msg, var}) => {
  useEffect(() => {

  }, [var])

  return <div className="alert alert-light" role="alert">
    A simple light alert—check it out!
  </div>
}

export default Alert;