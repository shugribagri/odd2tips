type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className=" mx-auto md:px-[10vw] px-5 font-montserrat">{children}</div>
  );
};

export default Container;
