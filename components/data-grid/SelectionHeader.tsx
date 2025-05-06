import React from 'react';
import { Paper, Typography, IconButton, Box } from "@mui/material";
import { Close, Edit, Delete, Download } from "@mui/icons-material";
import { Slide } from "@mui/material";
import { styles, colors } from '../../styles/data-grid-styles';

interface SelectionHeaderProps {
  selectionCount: number;
  onClearSelection: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Header component that appears when items are selected in the grid
 */
const SelectionHeader = ({
  selectionCount,
  onClearSelection,
  onDownload,
  onEdit,
  onDelete
}: SelectionHeaderProps) => {
  return (
    <Slide direction="down" in={selectionCount > 0} mountOnEnter unmountOnExit>
      <Paper 
        elevation={0}
        sx={{
          ...styles.selectionHeader,
          width: '100%', // Only cover the width of the main content
          position: "absolute",
          left: 0,
          right: 0,
          borderRadius: 0, // Remove rounded corners
        }}
      >
        <IconButton 
          size="small"
          sx={styles.actionButton}
          onClick={onClearSelection}
        >
          <Close fontSize="small" />
        </IconButton>
        
        <Typography sx={{ color: colors.teal.dark, fontWeight: "medium", ml: 1.5 }}>
          {selectionCount} {selectionCount === 1 ? "item" : "items"} selected
        </Typography>
        
        {/* Use flex-grow to push the action buttons to the right */}
        <Box sx={{ flex: 1 }} />
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton 
            size="small"
            sx={styles.actionButton}
            onClick={onDownload}
          >
            <Download fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={styles.actionButton}
            onClick={onEdit}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={styles.actionButton}
            onClick={onDelete}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Slide>
  );
};

export default SelectionHeader;