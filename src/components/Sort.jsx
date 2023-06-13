import {useState } from "react";

function Sort({sorts}) {

    const [activeSpan, setActiveSpan] = useState(0);
    // false - закрыто, true - открыто
    const [isOpen, setIsOpen] = useState(false);

    const toggleSort = (i) => {
        setActiveSpan(i);
        setIsOpen(false);
    }

    return (
        <div className="sort">
              <span onClick={() => setIsOpen(true)}>
                {sorts[activeSpan].toUpperCase()} <i className="fa-solid fa-chevron-down"></i>
              </span>
                {/* условный рендеринг: если isOpen == true, то рендерим. если false, то не рендерим */}
              {isOpen && <div className="select-sort">
                {
                    sorts.map((s, i) => <div key={i} onClick={() => toggleSort(i)} >{s}</div>)
                }
              </div>}
            </div>
    );
}

export default Sort;