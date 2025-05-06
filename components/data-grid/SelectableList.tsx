"use client"

import React, { useState } from "react"
import { cn } from "../../lib/utils"
import { styles, colors } from "../../styles/data-grid-styles"

interface SelectableItemProps {
  text: string
  isSelected?: boolean
  onSelect: (text: string) => void
  className?: string
}

export const SelectableItem: React.FC<SelectableItemProps> = ({ text, isSelected = false, onSelect, className }) => {
  return (
    <div
      className={cn("flex items-center overflow-hidden text-ellipsis whitespace-nowrap", className)}
      style={{
        ...styles.selectableList.item.base,
        ...(isSelected ? styles.selectableList.item.selected : styles.selectableList.item.unselected)
      }}
      onClick={() => onSelect(text)}
    >
      <div className="flex justify-center items-center h-full">{text}</div>
    </div>
  )
}

interface SelectableListProps {
  items: string[]
  header?: string
  defaultSelected?: string
  className?: string
  onSelectionChange?: (selected: string) => void
}

export const SelectableList: React.FC<SelectableListProps> = ({
  items,
  header,
  defaultSelected,
  className,
  onSelectionChange,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>(defaultSelected || items[0])

  const handleSelect = (item: string) => {
    setSelectedItem(item)
    if (onSelectionChange) {
      onSelectionChange(item)
    }
  }

  return (
    <div className={cn("py-2", className)} style={styles.selectableList.container}>
      {items.map((item, index) => (
        <React.Fragment key={item}>
          {index === 1 && header && (
            <>
              <div className="flex py-[7px] pb-2 flex-col items-start self-stretch">
                <div className="h-[1px] self-stretch" style={styles.selectableList.divider}></div>
              </div>
              <div
                className="flex h-[36px] flex-col justify-center items-start self-stretch"
                style={styles.selectableList.header}
              >
                {header}
              </div>
            </>
          )}
          <SelectableItem text={item} isSelected={selectedItem === item} onSelect={handleSelect} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default SelectableList
