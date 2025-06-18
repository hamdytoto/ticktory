// eslint-disable-next-line react/prop-types
const InputError = ({ error = "", additionalClasse = "" }) => {
  if (!error || error === "") return null;

  return (
    <p className={`mt-1 text-sm text-red-600 ${additionalClasse}`}>{error}</p>
  );
};

export default InputError;
