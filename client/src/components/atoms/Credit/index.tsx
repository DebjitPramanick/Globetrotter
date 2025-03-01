import { CreditWrapper, Link } from "./index.styled";

const Credit = ({ ...rest }) => {
  return (
    <CreditWrapper {...rest}>
      Created by{" "}
      <Link
        href="https://my-portfolio-teal-zeta.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Debjit Pramanick
      </Link>
    </CreditWrapper>
  );
};

export default Credit;
