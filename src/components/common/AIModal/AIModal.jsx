import { useState, useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import styles from "./AIModal.module.scss";

export default function AIModal({ show, onClose, answer }) {
  if (!show) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.overlayContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.overlayTitle}>AI Answer</h2>
        <p className={styles.overlayAnswer}>{answer}</p>
      </div>
    </div>
  );
}