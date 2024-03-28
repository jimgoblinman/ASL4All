import styles from "./font.module.css";

export default function Font() {
  const handleChange = (e) => {
    document.body.style.fontFamily = e.target.value;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-black/75 p-5 rounded-[0.7rem] bg-blur-md w-full max-w-md">
        <div className="flex justify-center items-center max-w-full w-full">
          <select
            className="w-full h-fit border-0"
            name="fonts"
            id="fonts"
            onChange={handleChange}
          >
            <option value="Arial" className={styles.fontArial}>
              Arial
            </option>
            <option value="Calibri" className={styles.fontCalibri}>
              Calibri
            </option>
            <option value="Gill Sans MT" className={styles.fontGillSansMt}>
              Gill Sans MT
            </option>
            <option value="Consolas" className={styles.fontConsolas}>
              Consolas
            </option>
            <option value="Inter" className={styles.fontInter}>
              Inter
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
