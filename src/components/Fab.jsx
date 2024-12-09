function AddFab({onclick}) {
    return (
      <div>
        <button
          data-tooltip-target="tooltip-default"
          onClick={onclick}
          className="fixed bottom-4 right-4 p-0 w-16 h-16 bg-red-500 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
          <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
          </svg>
        </button>
        <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Tooltip content
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

     </div>
   );
}

export {
  AddFab
}