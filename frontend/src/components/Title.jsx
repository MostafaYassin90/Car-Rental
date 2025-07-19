const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`${align ? align : "text-center"}`}>
      <h2 className="text-2xl md:text-4xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600">{subTitle}</p>
    </div>
  );
};

export default Title;
