import { ReactElement } from "react";
import { arima } from "@/fonts/fonts";

import "./Pagination.css";

export function Pagination({ currentPage, setCurrentPage, totalPages }: { currentPage: number, setCurrentPage: (arg0: number) => void, totalPages: number }): ReactElement<ReactElement> {

    function nextPage(): void {
        setCurrentPage(currentPage + 1);
    }

    function previousPage(): void {
        setCurrentPage(currentPage - 1);
    }

    return (
        <section className="pagination">
            <button 
                id="previous" 
                className={`gameButton ${arima.className}`}
                onClick={() => previousPage()} 
                disabled={currentPage > 1 ? false : true}>
                    Previous
            </button>
            
            <div className={`pagination-page__text ${arima.className}`}>Page <p className="pagination-page__number">{currentPage} / {totalPages} </p></div>
            
            <button 
                id="next" 
                className={`gameButton ${arima.className}`}
                onClick={() => nextPage()} 
                disabled={currentPage < totalPages ? false : true}>
                    Next
            </button>
        </section>
    );
}