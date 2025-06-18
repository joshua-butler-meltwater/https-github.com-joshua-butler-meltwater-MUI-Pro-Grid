import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";
import { DragIndicator } from "@mui/icons-material";
import { colors } from '../../styles/data-grid-styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// StrictMode fix for react-beautiful-dnd
// See: https://github.com/atlassian/react-beautiful-dnd/issues/2399
const useDndStrictModeWorkaround = () => {
  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    // Wait a tick to prevent "ReactDOM.render is no longer supported" error
    const timeout = setTimeout(() => {
      setEnabled(true);
    }, 0);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return enabled;
};

interface DraggableColumnsListProps {
  columns: any[];
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
  onColumnOrderChange: (newOrder: string[]) => void;
  onColumnVisibilityToggle: (field: string, isVisible: boolean) => void;
}

const DraggableColumnsList: React.FC<DraggableColumnsListProps> = ({
  columns,
  columnOrder,
  columnVisibility,
  onColumnOrderChange,
  onColumnVisibilityToggle
}) => {
  // Filter out selection and actions columns
  const draggableColumns = columns.filter(col => col.field !== 'selection' && col.field !== 'actions');
  
  // Use provided column order or generate from columns if not provided
  const displayOrder = columnOrder.length > 0 
    ? columnOrder 
    : draggableColumns.map(col => col.field);
  
  const handleDragEnd = (result: any) => {
    console.log('DragEnd result:', result);
    
    // Dropped outside the list
    if (!result.destination) {
      console.log('Dropped outside the list');
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    console.log(`Moving from index ${sourceIndex} to ${destinationIndex}`);
    
    // Reorder the columns
    const reorderedColumns = [...displayOrder];
    const [removed] = reorderedColumns.splice(sourceIndex, 1);
    reorderedColumns.splice(destinationIndex, 0, removed);
    
    // Notify parent component of the change
    console.log('New column order:', reorderedColumns);
    onColumnOrderChange(reorderedColumns);
  };

  // Use the StrictMode workaround
  const dndEnabled = useDndStrictModeWorkaround();
  
  // If DnD is not enabled yet due to StrictMode, render a loading state or fallback
  if (!dndEnabled) {
    return (
      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        <List dense sx={{ py: 0, '& .Mui-checked': { color: colors.teal.main } }}>
          {displayOrder.map((field) => {
            const column = columns.find(col => col.field === field);
            if (!column) return null;
            
            return (
              <ListItem
                key={field}
                sx={{
                  px: 1,
                  py: 0,
                  '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                  borderBottom: '1px solid #f5f5f5'
                }}
                component="div"
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'text.secondary' }}>
                  <DragIndicator fontSize="small" />
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
    );
  }

  return (
    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columnList">
          {(provided) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              dense
              sx={{ 
                py: 0,
                '& .Mui-checked': { color: colors.teal.main }
              }}
            >
              {displayOrder.map((field, index) => {
                const column = columns.find(col => col.field === field);
                if (!column) return null;
                
                return (
                  <Draggable key={field} draggableId={field} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          px: 1,
                          py: 0,
                          backgroundColor: snapshot.isDragging ? 'rgba(29, 159, 159, 0.08)' : 'inherit',
                          '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                          borderBottom: '1px solid #f5f5f5'
                        }}
                        component="div"
                      >
                        <Box
                          {...provided.dragHandleProps}
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mr: 1,
                            cursor: 'grab',
                            color: 'text.secondary' 
                          }}
                        >
                          <DragIndicator fontSize="small" />
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
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default DraggableColumnsList;
