import React from 'react';
import { styles } from '../../styles/data-grid-styles';

interface TruncatedCellProps {
  value: any;
}

/**
 * A cell component that truncates content to 2 lines with ellipsis
 */
export const TruncatedCell = ({ value }: TruncatedCellProps) => {
  return (
    <div style={styles.cellTruncation}>
      {value}
    </div>
  );
};

export default TruncatedCell;