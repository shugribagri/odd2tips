import Container from "@/app/blog/_components/container";
import cn from "classnames";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  return (
    <div>
      <div>
        {preview ? (
          <div>
            This page is a preview. <a>Click here</a> to exit preview mode.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Alert;
