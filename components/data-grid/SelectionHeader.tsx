import React from 'react';
import { Paper, Typography, IconButton, Box, Tooltip } from "@mui/material";
import { CloseOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, SellOutlined, MergeOutlined, NotificationsOutlined } from "@mui/icons-material";
import { Slide } from "@mui/material";
import { styles, colors } from '../../styles/data-grid-styles';

interface SelectionHeaderProps {
  selectionCount: number;
  onClearSelection: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSell?: () => void;
  onMerge?: () => void;
  onNotifications?: () => void;
}

/**
 * Header component that appears when items are selected in the grid
 */
const SelectionHeader = ({
  selectionCount,
  onClearSelection,
  onDownload,
  onEdit,
  onSell,
  onMerge,
  onNotifications,
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
          <CloseOutlined fontSize="small" />
        </IconButton>
        
        <Typography sx={{ color: colors.teal.dark, fontWeight: "medium", ml: 1.5 }}>
          {selectionCount} {selectionCount === 1 ? "item" : "items"} selected
        </Typography>
        
        {/* Use flex-grow to push the action buttons to the right */}
        <Box sx={{ flex: 1 }} />
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Assign label">
            <IconButton 
              size="small"
              sx={styles.actionButton}
              onClick={onSell}
            >
              <SellOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Combine searches">
            <IconButton 
              size="small"
              sx={styles.actionButton}
              onClick={onMerge}
            >
              <MergeOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Create alert">
            <IconButton 
              size="small"
              sx={styles.actionButton}
              onClick={onNotifications}
            >
              <NotificationsOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Download">
            <IconButton 
              size="small"
              sx={styles.actionButton}
              onClick={onDownload}
            >
              <DownloadOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Edit">
            <IconButton 
              size="small"
              sx={styles.actionButton}
              onClick={onEdit}
            >
              <EditOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Delete">
            <IconButton 
              size="small"
              sx={styles.actionButton}
              onClick={onDelete}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Slide>
  );
};

export default SelectionHeader;