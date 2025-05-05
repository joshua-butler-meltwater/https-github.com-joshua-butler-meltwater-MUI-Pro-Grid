import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert, Edit, Delete, Fullscreen } from "@mui/icons-material";
import { CountryData } from '../../data/countries';

interface ActionsCellProps {
  params: { row: CountryData };
  onEdit?: (country: CountryData) => void;
  onDelete?: (country: CountryData) => void;
  onExpand?: (country: CountryData) => void;
}

/**
 * Actions cell component with dropdown menu for row actions
 */
const ActionsCell = ({ params, onEdit, onDelete, onExpand }: ActionsCellProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const country = params.row;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandModal = () => {
    if (onExpand) onExpand(country);
    handleClose();
  };

  const handleEdit = () => {
    if (onEdit) onEdit(country);
    handleClose();
  };

  const handleDelete = () => {
    if (onDelete) onDelete(country);
    handleClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleExpandModal}>
          <Fullscreen fontSize="small" style={{ marginRight: 8 }} />
          Expand to modal
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete fontSize="small" style={{ marginRight: 8 }} />
          Trash
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsCell;