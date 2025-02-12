import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon, CheckIcon } from "@/components/ui/icon";

export default function ComboBox({
  BoxValues,
  setComboBoxValue,
  comboBoxValue,
  boxStyle,
}: {
  BoxValues: { name: string; title: string }[];
  setComboBoxValue: (x: string) => void;
  comboBoxValue: string;
  boxStyle?:  {} | null;
}) {
  const [select, isSelected] = useState(comboBoxValue);
 
   return (
    <Select
      onValueChange={async (x) => { 
        setComboBoxValue(x); 
        isSelected(x); 
 
      }}
 
    >
      <SelectTrigger
        variant="outline"
        size="md"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          ...(boxStyle || {}),
        }}
      >
        <SelectInput
          value={comboBoxValue}
          style={{ fontWeight: 700, color: "black" }}
        />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {BoxValues.map((x, index) => {
            return (
              <SelectItem
                label={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: select === x.name ? "white" : "black",
                        textAlignVertical: "center",
                      }}
                    >
                      {x.name}
                    </Text>
                    {select === x.name && (
                      <CheckIcon
                        style={{ marginLeft: 8 }}  
                        width={20}
                        height={20}
                        color="white"
                        fill="green"
                      />
                    )}
                  </View>
                }
                value={x.name}
                key={index}
                style={{
                  backgroundColor: select == x.name ? "green" : "white",
                }}
              />
            );
          })}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
