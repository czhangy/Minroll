// Stylesheet
import styles from "@/styles/Global/Pagination.module.scss";
// Next
import Image from "next/image";

type Props = {
    page: number;
    maxPage: number;
    onPrev: () => void;
    onNext: () => void;
};

const Pagination: React.FC<Props> = ({
    page,
    maxPage,
    onPrev,
    onNext,
}: Props) => {
    return (
        <div className={styles.pagination}>
            {page > 1 ? (
                <button
                    className={`${styles["arrow"]} ${styles["left"]}`}
                    onClick={onPrev}
                >
                    <Image
                        src="/icons/chevron.svg"
                        alt="Previous page"
                        layout="fill"
                        objectFit="contain"
                    />
                </button>
            ) : (
                ""
            )}
            <p className={styles["page-num"]}>{page}</p>
            <p className={styles.slash}>/</p>
            <p className={styles["page-num"]}>{maxPage}</p>
            {page !== maxPage ? (
                <button
                    className={`${styles["arrow"]} ${styles["right"]}`}
                    onClick={onNext}
                >
                    <Image
                        src="/icons/chevron.svg"
                        alt="Next page"
                        layout="fill"
                        objectFit="contain"
                    />
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default Pagination;
