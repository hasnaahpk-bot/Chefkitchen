const ConfirmModal = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  showDontAskAgain = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0f1720] w-[90%] max-w-sm rounded-2xl p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mb-4">
          {message}
        </p>

        {showDontAskAgain && (
          <label className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <input
              type="checkbox"
              className="accent-orange-500"
              onChange={(e) =>
                localStorage.setItem(
                  "skipOrderTypeConfirm",
                  e.target.checked ? "true" : "false"
                )
              }
            />
            Don’t ask again
          </label>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-[#1f2430] text-gray-300 hover:bg-[#2a2f3d]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
          >
            Yes, Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
