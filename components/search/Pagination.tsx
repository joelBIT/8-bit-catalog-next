import { ReactElement } from "react";
import styles from "./pagination.module.css";
import { arima } from "@/fonts/fonts";

export function Pagination({ currentPage, setCurrentPage, totalPages }: { currentPage: number, setCurrentPage: (arg0: number) => void, totalPages: number }): ReactElement {

    function nextPage(): void {
        setCurrentPage(currentPage + 1);
    }

    function previousPage(): void {
        setCurrentPage(currentPage - 1);
    }

    return (
        <section id={styles.pagination}>
            <button 
                id="previous" 
                className={`gameButton ${arima.className}`}
                onClick={() => previousPage()} 
                disabled={currentPage > 1 ? false : true}>
                    Previous
            </button>
            
            <div className={`${styles.pageNumber} ${arima.className}`}>Page <p className={styles.p}>{currentPage} / {totalPages} </p></div>
            
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