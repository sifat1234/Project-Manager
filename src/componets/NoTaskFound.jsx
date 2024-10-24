export default function NoTaskFound({ textColor }) {
  return (
    <p
      className={`mt-4 p-6 h-32 bg-gray-700 rounded-lg text-center shadow-lg border border-gray-600 flex items-center justify-center  ${textColor}`}
    >
      Task List is empty!
    </p>
  );
}
