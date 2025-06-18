import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Button,
  Tooltip,
} from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { colors } from '../../styles/data-grid-styles';

interface NativeDraggableColumnsListProps {
  columns: any[];
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
  onColumnOrderChange: (newOrder: string[]) => void;
  onColumnVisibilityToggle: (field: string, isVisible: boolean) => void;
  onResetAll?: () => void;
}

/**
 * A component for displaying and managing draggable columns using native HTML5 drag and drop
 */
const NativeDraggableColumnsList: React.FC<NativeDraggableColumnsListProps> = ({
  columns,
  columnOrder,
  columnVisibility,
  onColumnOrderChange,
  onColumnVisibilityToggle,
  onResetAll
}) => {
  // Filter out selection and actions columns
  const draggableColumns = columns.filter(col => col.field !== 'selection' && col.field !== 'actions');
  
  // Use provided column order or generate from columns if not provided
  const [internalOrder, setInternalOrder] = useState<string[]>([]);
  
  useEffect(() => {
    const orderToUse = columnOrder.length > 0 
      ? columnOrder 
      : draggableColumns.map(col => col.field);
    setInternalOrder(orderToUse);
  }, [columnOrder, draggableColumns]);
  
  // State to track the dragged item
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, field: string) => {
    setDraggedItem(field);
    // Set the dragged data
    event.dataTransfer.setData('text/plain', field);
    // Set the drag effect
    event.dataTransfer.effectAllowed = 'move';
    
    // Add a custom class to the dragged element for styling
    event.currentTarget.classList.add('dragging');
    console.log('Drag started:', field);
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
    // Add visual feedback for the drag target
    if (draggedItem) {
      // Add some visual effect for the drag target
      event.currentTarget.style.boxShadow = 'inset 0 -2px 0 0 rgba(29, 159, 159, 0.6)';
    }
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    // Remove visual feedback when dragging leaves the element
    event.currentTarget.style.boxShadow = 'none';
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetField: string) => {
    event.preventDefault();
    
    if (!draggedItem) return;
    
    // Get the current order
    const currentOrder = [...internalOrder];
    
    // Get indices
    const draggedIndex = currentOrder.indexOf(draggedItem);
    const targetIndex = currentOrder.indexOf(targetField);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    // Create new order
    const newOrder = [...currentOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);
    
    console.log('New column order:', newOrder);
    
    // Update internal state
    setInternalOrder(newOrder);
    
    // Notify parent immediately with the new order
    onColumnOrderChange(newOrder);
    
    // Reset dragged item
    setDraggedItem(null);
  };
  
  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // Reset any visual styling
    event.currentTarget.classList.remove('dragging');
    document.querySelectorAll('.MuiListItem-root').forEach(item => {
      (item as HTMLElement).style.boxShadow = 'none';
    });
    setDraggedItem(null);
  };
  
  // Handle show all columns
  const handleShowAll = () => {
    draggableColumns.forEach(col => {
      onColumnVisibilityToggle(col.field, true);
    });
  };
  
  // Handle hide all columns (except first one)
  const handleHideAll = () => {
    const visibleColumns = draggableColumns;
    // Keep the first column visible
    const firstColumn = visibleColumns[0];
    
    visibleColumns.forEach(col => {
      onColumnVisibilityToggle(col.field, col.field === firstColumn.field);
    });
  };
  
  // Handle reset all
  const handleResetAll = () => {
    // Reset all columns to visible
    draggableColumns.forEach(col => {
      onColumnVisibilityToggle(col.field, true);
    });
    
    // Reset column order
    const defaultOrder = draggableColumns.map(col => col.field);
    setInternalOrder(defaultOrder);
    
    // Clear from localStorage if you're using it
    try {
      localStorage.removeItem('dataGridColumnOrder');
    } catch (e) {
      console.error('Failed to remove column order from localStorage:', e);
    }
    
    console.log('Reset column order to default:', defaultOrder);
    onColumnOrderChange(defaultOrder);
    
    // Call parent's reset function if provided
    if (onResetAll) {
      onResetAll();
    }
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
        <Button 
          onClick={handleShowAll} 
          sx={{ flex: 1, justifyContent: 'center', color: colors.teal.main }}
        >
          <Typography variant="body2" sx={{ fontSize: '13px' }}>
            Show All
          </Typography>
        </Button>
        <Box sx={{ width: '1px', bgcolor: '#e0e0e0' }} />
        <Button 
          onClick={handleHideAll} 
          sx={{ flex: 1, justifyContent: 'center', color: colors.teal.main }}
        >
          <Typography variant="body2" sx={{ fontSize: '13px' }}>
            Hide All
          </Typography>
        </Button>
      </Box>
      
      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        <List dense sx={{ py: 0, '& .Mui-checked': { color: colors.teal.main } }}>
          {internalOrder.map((field) => {
            const column = columns.find(col => col.field === field);
            if (!column) return null;
            
            return (
              <ListItem
                key={field}
                sx={{
                  px: 1,
                  py: 0,
                  backgroundColor: draggedItem === field ? 'rgba(29, 159, 159, 0.08)' : 'inherit',
                  '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                  '&.dragging': { opacity: 0.5, backgroundColor: 'rgba(29, 159, 159, 0.12)' },
                  borderBottom: '1px solid #f5f5f5',
                  cursor: 'move',
                  transition: 'background-color 0.2s, box-shadow 0.2s, opacity 0.2s'
                }}
                component="div"
                draggable
                onDragStart={(e) => handleDragStart(e, field)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, field)}
                onDragEnd={handleDragEnd}
              >
                <Box
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mr: 1,
                    cursor: 'grab',
                    color: 'text.secondary' 
                  }}
                >
                  <Tooltip title="Drag to reorder column" placement="left" arrow>
                    <DragIndicator fontSize="small" />
                  </Tooltip>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={columnVisibility[field] !== false}
                      onChange={() => {
                        onColumnVisibilityToggle(
                          field, 
                          !(columnVisibility[field] !== false)
                        );
                      }}
                      size="small"
                      sx={{
                        '&.Mui-checked': { color: colors.teal.main },
                        '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                      }}
                    />
                  }
                  label={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: '14px', 
                        fontWeight: columnVisibility[field] !== false ? 500 : 400,
                        opacity: columnVisibility[field] !== false ? 1 : 0.7
                      }}
                    >
                      {column.headerName}
                    </Typography>
                  }
                  sx={{ width: "100%", m: 0 }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      
      <Box sx={{ borderTop: '1px solid #e0e0e0', pt: 1 }}>
        <Button 
          onClick={handleResetAll}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%', 
            justifyContent: 'center', 
            color: colors.teal.main 
          }}
        >
          Reset All
        </Button>
      </Box>
    </Box>
  );
};

export default NativeDraggableColumnsList;
