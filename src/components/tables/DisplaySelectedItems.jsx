import PropTypes from "prop-types";

const DisplaySelectedItems = ({ selectedRows }) => {
  return (
    <div className="w-full flex justify-center mt-2 px-4">
      <div className="w-full max-w-6xl rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Selected Users
          </h2>
          <p className="text-sm text-gray-500">
            {selectedRows.length} user{selectedRows.length !== 1 && "s"}{" "}
            selected
          </p>
        </div>

        {/* Scrollable container */}
        <div className="max-h-[500px] overflow-y-auto pr-2">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {selectedRows.map((item, index) => (
              <div
                key={index}
                className="rounded-md border border-gray-100 bg-sky-100 p-4 transition hover:bg-sky-200"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name || "Unnamed User"}
                  </h3>
                  <span
                    className={`inline-block mt-1 rounded-full px-3 py-0.5 text-xs font-semibold 
                    ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  {Object.entries(item)
                    .filter(([key]) => ["email", "role", "id"].includes(key))
                    .map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium capitalize text-gray-500 mr-1">
                          {key}:
                        </span>
                        <span>{String(value)}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DisplaySelectedItems.propTypes = {
  selectedRows: PropTypes.array,
};

export default DisplaySelectedItems;
