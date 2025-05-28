import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnergyConsumption } from "../../../redux/features/emsData/energyConsumptionData";
import { fetchWaterConsumption } from "../../../redux/features/emsData/waterConsumptionAdditionalData";
import MobileCombustionEmissionDialog from "./MobileCombustionEmissionDialog";
import StationaryCombustionEmissionDialog from "./StationaryCombustionEmissionDialog";
import IndustrialProcessEmissionDialog from "./IndustrialProcessEmissionDialog";
import FugitiveEmissionDialog from "./FugitiveEmissionDialog";
import PurchasedElectricityDialog from "./PurchasedElectricityDialog";
import PurchasedSteamHeatCoolingEmissionDialog from "./PurchasedSteamHeatCoolingEmissionDialog";
import PurchasedGoodsServicesDialog from "./PurchasedGoodsServicesDialog";
import UseSoldProductEmissionDialog from "./UseSoldProductEmissionDialog";
import EndOfLifeTreatmentDialog from "./EndOfLifeTreatmentDialog";
import UserCustomEmissionFactorDialog from "./CustomMobileCombustionEmissionFactorDialog";
import WaterUseWaterTreatmentDialog from "./WaterUseWaterTreatmentDialog";
import AddIndustrialProcessDialog from "./AddIndustrialProcessDialog";
import AddRefrigerantDialog from "./AddRefrigerantDialog";

const EnvironmentSec = ({
  sectionName,
  subcategory,
  questions,
  handleInputChange,
  resetTrigger,
  reportingMonth,
  bod = { bod },
  cod = { cod },
}) => {
  const userId = useSelector((state) => state.auth.user?.id);
  const userName = useSelector((state) => state.auth.user?.userName);

  const dispatch = useDispatch();
  const { loading, totalConsumption, carbonEmission, error } = useSelector(
    (state) => state.water
  );

  const { lastEnergy } = useSelector((state) => state.energy);

  useEffect(() => {
    if (userName) dispatch(fetchEnergyConsumption(userName));
  }, [dispatch, userName]);

  useEffect(() => {
    if (subcategory === "Purchased Electricity" && lastEnergy !== null) {
      const defaultData = {
        [`${subcategory.replace(/\s+/g, "")}_Q1`]: lastEnergy,
      };

      setBasicEntry((prev) => {
        const updated = { ...prev, ...defaultData };
        const arrayEntries = [{ ...updated }];
        handleInputChange(
          `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(
            /\s+/g,
            ""
          )}`,
          arrayEntries,
          reportingMonth
        );
        return updated;
      });
    }
  }, [lastEnergy, reportingMonth, subcategory, sectionName]);

  useEffect(() => {
    if (
      subcategory === "Water Use & Wastewater Treatment" &&
      (bod !== null || cod !== null || totalConsumption !== null)
    ) {
      const defaultData = {};

      if (bod !== null) {
        defaultData["WaterUse&WastewaterTreatment_BOD"] = bod;
      }
      if (cod !== null) {
        defaultData["WaterUse&WastewaterTreatment_COD"] = cod;
      }
      if (totalConsumption !== null) {
        defaultData["WaterUse&WastewaterTreatment_Q1"] = totalConsumption;
      }

      // ✅ Merge new data without clearing existing fields
      setBasicEntry((prev) => {
        const updated = { ...prev, ...defaultData };
        const arrayEntries = [{ ...updated }];
        handleInputChange(
          `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(
            /\s+/g,
            ""
          )}`,
          arrayEntries,
          reportingMonth
        );
        return updated;
      });
    }
  }, [bod, cod, totalConsumption, reportingMonth, subcategory, sectionName]);

  useEffect(() => {
    dispatch(fetchWaterConsumption(userName)); // or dynamic userName
  }, [dispatch]);

  const isMultiEntry = [
    "Purchased Goods Services",
    "Use of Sold Products",
    "End-of-Life Treatment of Sold Products",
    "Mobile Combustion",
    "Stationary Combustion",
    "Industrial Processes",
    "Fugitive Emissions",
    "General Project Details",
    "Environmental & Carbon Impact",
    "Financial & Ownership",
    "Compliance & Certifications",
    "Additional Information",
  ].includes(subcategory);

  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({});
  const [basicEntry, setBasicEntry] = useState({});
  const [openEmissionDialog, setOpenEmissionDialog] = useState(false);
  const [openStationaryDialog, setOpenStationaryDialog] = useState(false);
  const [openIndustrialDialog, setOpenIndustrialDialog] = useState(false);
  const [openFugitiveDialog, setOpenFugitiveDialog] = useState(false);
  const [openPurchasedElectricityDialog, setOpenPurchasedElectricityDialog] =
    useState(false);
  const [openPurchasedSteamDialog, setOpenPurchasedSteamDialog] =
    useState(false);
  const [
    openPurchasedGoodsServicesDialog,
    setOpenPurchasedGoodsServicesDialog,
  ] = useState(false);
  const [openUseofSoldProductsDialog, setOpenUseofSoldProductsDialog] =
    useState(false);
  const [openEndofLifeTreatmentDialog, setOpenEndofLifeTreatmentDialog] =
    useState(false);
  const [openCustomFactorDialog, setOpenCustomFactorDialog] = useState(false);
  const [
    openWaterUseWaterTreatmentDialog,
    setOpenWaterUseWaterTreatmentDialog,
  ] = useState(false);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);
  const [industryTypeOptions, setIndustryTypeOptions] = useState([]);
  const [emissionSourceOptions, setEmissionSourceOptions] = useState([]);
  const [fugitiveEmissionSourceOptions, setFugitiveEmissionSourceOptions] =
    useState([]);
  const [openAddIndustrialDialog, setOpenAddIndustrialDialog] = useState(false);
  const [refrigerantTypeOptions, setRefrigerantTypeOptions] = useState([]);
  const [openAddRefrigerantDialog, setOpenAddRefrigerantDialog] =
    useState(false);

  useEffect(() => {
    const fetchPreviousData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`/api/submissions/${userId}`);
        const userData =
          response.data?.responses?.[`${sectionName}_${subcategory}`] || [];
        setEntries(userData);
      } catch (error) {
        console.error("Error fetching previous submissions:", error);
      }
    };
    fetchPreviousData();
  }, [userId, sectionName, subcategory]);

  const handleFieldChange = (id, value) => {
    setCurrentEntry((prev) => ({ ...prev, [id]: value }));
  };

  // const handleBasicFieldChange = (id, value) => {
  //   setBasicEntry((prev) => {
  //     const updatedEntry = { ...prev, [id]: value };
  //     const arrayEntries = [{ ...updatedEntry }];
  //     handleInputChange(
  //       `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
  //       arrayEntries,
  //       reportingMonth
  //     );
  //     return updatedEntry;
  //   });
  // };

  const handleBasicFieldChange = (id, value) => {
    setBasicEntry((prev) => {
      const updatedEntry = {
        ...prev,
        [id]: value,
      };

      // ⛔️ Always reinforce the default values if present
      if (subcategory === "Purchased Electricity" && lastEnergy !== null) {
        updatedEntry[`${subcategory.replace(/\s+/g, "")}_Q1`] = lastEnergy;
      }

      if (subcategory === "Water Use & Wastewater Treatment") {
        if (bod !== null) {
          updatedEntry["WaterUse&WastewaterTreatment_BOD"] = bod;
        }
        if (cod !== null) {
          updatedEntry["WaterUse&WastewaterTreatment_COD"] = cod;
        }
        if (totalConsumption !== null) {
          updatedEntry["WaterUse&WastewaterTreatment_Q1"] = totalConsumption;
        }
      }

      const arrayEntries = [updatedEntry];
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        arrayEntries,
        reportingMonth
      );

      return updatedEntry;
    });
  };

  const handleAddEntry = () => {
    if (
      Object.keys(currentEntry).length > 0 ||
      Object.keys(basicEntry).length > 0
    ) {
      const updatedEntry = { ...basicEntry, ...currentEntry };
      const updatedEntries = [...entries, updatedEntry];
      setEntries(updatedEntries);
      handleInputChange(
        `${sectionName.replace(/\s+/g, "")}_${subcategory.replace(/\s+/g, "")}`,
        updatedEntries,
        reportingMonth
      );
      setCurrentEntry({});
      setBasicEntry({});
    }
  };

  useEffect(() => {
    const fetchVehicleAndFuelTypes = async () => {
      try {
        const res = await axios.get("/api/mobile-combustion/get");
        const records = res.data.records || [];

        const vehicleTypes = [
          ...new Set(records.map((r) => r.vehicleType).filter(Boolean)),
        ];
        const fuelTypes = [
          ...new Set(records.map((r) => r.fuelType).filter(Boolean)),
        ];

        setVehicleTypeOptions([...vehicleTypes, "other"]);
        setFuelTypeOptions([...fuelTypes]);
      } catch (error) {
        console.error("Error fetching mobile combustion types:", error);
      }
    };

    fetchVehicleAndFuelTypes();
  }, [openCustomFactorDialog]); // trigger on dialog open

  useEffect(() => {
    const fetchIndustrialProcesses = async () => {
      try {
        const res = await axios.get("/api/industrial-processes/get");
        const records = res.data || [];

        const industryTypes = [
          ...new Set(records.map((r) => r.industryType).filter(Boolean)),
        ];
        const emissionSources = [
          ...new Set(records.map((r) => r.emissionSource).filter(Boolean)),
        ];

        setIndustryTypeOptions([...industryTypes, "other"]);
        setEmissionSourceOptions(emissionSources);
      } catch (error) {
        console.error("Error fetching industrial processes:", error);
      }
    };

    fetchIndustrialProcesses();
  }, [openAddIndustrialDialog]); // refetch after dialog closes

  useEffect(() => {
    const fetchRefrigerants = async () => {
      try {
        const res = await axios.get("/api/fugitive-emissions/get");

        const records = Array.isArray(res.data)
          ? res.data
          : res.data.records || [];

        const refrigerants = [
          ...new Set(records.map((r) => r.gasType).filter(Boolean)),
        ];

        const emissionSources = [
          ...new Set(records.map((r) => r.source).filter(Boolean)),
        ];

        setRefrigerantTypeOptions([...refrigerants, "other"]);
        setFugitiveEmissionSourceOptions(emissionSources); // ✅ new line

        console.log("records fugitive:", records);
        console.log("refrigerant:", refrigerants);
        console.log("emission sources:", emissionSources);
      } catch (error) {
        console.error("Error fetching refrigerants:", error);
      }
    };

    fetchRefrigerants();
  }, [openAddRefrigerantDialog]);

  useEffect(() => {
    setEntries([]);
    setCurrentEntry({});
    setBasicEntry({});
  }, [resetTrigger]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography>{subcategory}</Typography>
            {subcategory === "Mobile Combustion" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEmissionDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Stationary Combustion" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenStationaryDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Industrial Processes" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndustrialDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Fugitive Emissions" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenFugitiveDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Purchased Electricity" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPurchasedElectricityDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Purchased Steam, Heat, or Cooling" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPurchasedSteamDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Purchased Goods Services" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenPurchasedGoodsServicesDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Use of Sold Products" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUseofSoldProductsDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "End-of-Life Treatment of Sold Products" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenEndofLifeTreatmentDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
            {subcategory === "Water Use & Wastewater Treatment" && (
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenWaterUseWaterTreatmentDialog(true);
                }}
              >
                Emission Details
              </Button>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {questions.length > 0 && (
            <>
              {(() => {
                let renderedIndex = -1; // track last rendered index
                let shouldRenderNext = true;

                return questions.map((q, index) => {
                  // ⛔ Skip if already handled in a grouped row
                  if (index <= renderedIndex) return null;

                  const fieldId = `${subcategory.replace(/\s+/g, "")}_Q${
                    index + 1
                  }`;
                  const isMulti = isMultiEntry;
                  let optionsToRender = q.options;

                  if (
                    q.question === "Type of vehicle?" &&
                    subcategory === "Mobile Combustion"
                  ) {
                    optionsToRender = vehicleTypeOptions;
                  }
                  if (
                    q.question === "Fuel type per vehicle?" &&
                    subcategory === "Mobile Combustion"
                  ) {
                    optionsToRender = fuelTypeOptions;
                  }
                  if (
                    q.question === "Select type of industrial process?" &&
                    subcategory === "Industrial Processes"
                  ) {
                    optionsToRender = industryTypeOptions;
                  }

                  if (
                    q.question === "Select emission source:" &&
                    subcategory === "Industrial Processes"
                  ) {
                    optionsToRender = emissionSourceOptions;
                  }
                  if (
                    q.question === "Select type of refrigerant used:" &&
                    subcategory === "Fugitive Emissions"
                  ) {
                    optionsToRender = refrigerantTypeOptions;
                  }
                  if (
                    q.question === "Select emission source:" &&
                    subcategory === "Fugitive Emissions"
                  ) {
                    optionsToRender = fugitiveEmissionSourceOptions;
                  }

                  // ✅ Handle conditional skip after boolean
                  const prevQuestion = questions[index - 1];
                  const prevFieldId = `${subcategory.replace(
                    /\s+/g,
                    ""
                  )}_Q${index}`;
                  const prevAnswer =
                    currentEntry[prevFieldId] || basicEntry[prevFieldId];

                  if (
                    index > 0 &&
                    prevQuestion?.type === "boolean" &&
                    prevAnswer !== "Yes"
                  ) {
                    shouldRenderNext = false;
                  }
                  if (!shouldRenderNext) return null;

                  // ✅ Handle "align: row" fields group
                  if (q.align === "row") {
                    const group = [q];
                    let i = index + 1;

                    while (
                      i < questions.length &&
                      questions[i].align === "row"
                    ) {
                      group.push(questions[i]);
                      i++;
                    }

                    renderedIndex = i - 1;

                    return (
                      <div
                        key={`row-group-${index}`}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        {group.map((field, groupIdx) => {
                          const groupedFieldId = `${subcategory.replace(
                            /\s+/g,
                            ""
                          )}_Q${index + groupIdx + 1}`;
                          const value = isMulti
                            ? currentEntry[groupedFieldId] || ""
                            : basicEntry[groupedFieldId] || "";

                          return (
                            <div
                              key={groupedFieldId}
                              style={{ flex: "1 1 300px", minWidth: "200px" }}
                            >
                              <Typography variant="subtitle1">
                                {field.question}
                              </Typography>
                              <TextField
                                select={field.type === "dropdown"}
                                fullWidth
                                variant="outlined"
                                type={
                                  field.type === "number" ? "number" : "text"
                                }
                                value={value}
                                onChange={(e) =>
                                  isMulti
                                    ? handleFieldChange(
                                        groupedFieldId,
                                        e.target.value
                                      )
                                    : handleBasicFieldChange(
                                        groupedFieldId,
                                        e.target.value
                                      )
                                }
                              >
                                {field.type === "dropdown" &&
                                  field.options.map((option, idx) => (
                                    <MenuItem key={idx} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                              </TextField>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  {
                    /**BOD ,COD */
                  }
                  if (q.type === "bod_cod") {
                    const bodFieldId = `${subcategory.replace(/\s+/g, "")}_BOD`;
                    const codFieldId = `${subcategory.replace(/\s+/g, "")}_COD`;

                    const bodValue = isMulti
                      ? currentEntry[bodFieldId] ?? bod ?? ""
                      : basicEntry[bodFieldId] ?? bod ?? "";

                    const codValue = isMulti
                      ? currentEntry[codFieldId] ?? cod ?? ""
                      : basicEntry[codFieldId] ?? cod ?? "";

                    return (
                      <div
                        key={bodFieldId + codFieldId}
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: "16px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <Typography variant="subtitle1">
                            BOD of wastewater (mg/L)
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            type="number"
                            value={bodValue}
                            onChange={(e) =>
                              isMulti
                                ? handleFieldChange(bodFieldId, e.target.value)
                                : handleBasicFieldChange(
                                    bodFieldId,
                                    e.target.value
                                  )
                            }
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <Typography variant="subtitle1">
                            COD of wastewater (mg/L)
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            type="number"
                            value={codValue}
                            onChange={(e) =>
                              isMulti
                                ? handleFieldChange(codFieldId, e.target.value)
                                : handleBasicFieldChange(
                                    codFieldId,
                                    e.target.value
                                  )
                            }
                          />
                        </div>
                      </div>
                    );
                  }

                  {
                    /**BOD ,COD */
                  }

                  return (
                    <div key={fieldId} style={{ marginBottom: "16px" }}>
                      <Typography variant="subtitle1">{q.question}</Typography>
                      {q.type === "boolean" ? (
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={
                              isMulti
                                ? currentEntry[fieldId] || ""
                                : basicEntry[fieldId] || ""
                            }
                            onChange={(e) =>
                              isMulti
                                ? handleFieldChange(fieldId, e.target.value)
                                : handleBasicFieldChange(
                                    fieldId,
                                    e.target.value
                                  )
                            }
                          >
                            <FormControlLabel
                              value="Yes"
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value="No"
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      ) : q.type === "dropdown" ? (
                        <div>
                          <TextField
                            select
                            fullWidth
                            variant="outlined"
                            value={
                              isMulti
                                ? currentEntry[fieldId] || ""
                                : basicEntry[fieldId] || ""
                            }
                            onChange={(e) =>
                              isMulti
                                ? handleFieldChange(fieldId, e.target.value)
                                : handleBasicFieldChange(
                                    fieldId,
                                    e.target.value
                                  )
                            }
                          >
                            {optionsToRender.map((option, idx) => (
                              <MenuItem key={idx} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                          {q.question === "Type of vehicle?" &&
                            (isMulti
                              ? currentEntry[fieldId]
                              : basicEntry[fieldId]) === "other" && (
                              <div style={{ marginTop: "10px" }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    setOpenCustomFactorDialog(true)
                                  }
                                >
                                  Add Other Vehicle Details
                                </Button>
                              </div>
                            )}
                          {q.question ===
                            "Select type of industrial process?" &&
                            (isMulti
                              ? currentEntry[fieldId]
                              : basicEntry[fieldId]) === "other" && (
                              <div style={{ marginTop: "10px" }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    setOpenAddIndustrialDialog(true)
                                  }
                                >
                                  Add New Process
                                </Button>
                              </div>
                            )}
                          {q.question === "Select type of refrigerant used:" &&
                            (isMulti
                              ? currentEntry[fieldId]
                              : basicEntry[fieldId]) === "other" && (
                              <div style={{ marginTop: "10px" }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  onClick={() =>
                                    setOpenAddRefrigerantDialog(true)
                                  }
                                >
                                  Add New Refrigerant
                                </Button>
                              </div>
                            )}
                        </div>
                      ) : q.type === "array" ? (
                        <div>
                          {(
                            (isMulti
                              ? currentEntry[fieldId]
                              : basicEntry[fieldId]) || []
                          ).map((methodEntry, methodIndex) => (
                            <div
                              key={methodIndex}
                              style={{
                                marginBottom: "16px",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                              }}
                            >
                              {q.fields.map((field, fIdx) => {
                                const nestedFieldId = `${fieldId}_method_${methodIndex}_F${
                                  fIdx + 1
                                }`;
                                return (
                                  <div
                                    key={nestedFieldId}
                                    style={{ marginBottom: "12px" }}
                                  >
                                    <Typography variant="subtitle2">
                                      {field.question}
                                    </Typography>
                                    {field.type === "dropdown" ? (
                                      <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        value={methodEntry[nestedFieldId] || ""}
                                        onChange={(e) => {
                                          const updatedArray = [
                                            ...((isMulti
                                              ? currentEntry[fieldId]
                                              : basicEntry[fieldId]) || []),
                                          ];
                                          updatedArray[methodIndex] = {
                                            ...updatedArray[methodIndex],
                                            [nestedFieldId]: e.target.value,
                                          };
                                          if (isMulti)
                                            handleFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                          else
                                            handleBasicFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                        }}
                                      >
                                        {field.options.map((option, idx) => (
                                          <MenuItem key={idx} value={option}>
                                            {option}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    ) : (
                                      <TextField
                                        fullWidth
                                        variant="outlined"
                                        type={
                                          field.type === "number"
                                            ? "number"
                                            : "text"
                                        }
                                        value={methodEntry[nestedFieldId] || ""}
                                        onChange={(e) => {
                                          const updatedArray = [
                                            ...((isMulti
                                              ? currentEntry[fieldId]
                                              : basicEntry[fieldId]) || []),
                                          ];
                                          updatedArray[methodIndex] = {
                                            ...updatedArray[methodIndex],
                                            [nestedFieldId]: e.target.value,
                                          };
                                          if (isMulti)
                                            handleFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                          else
                                            handleBasicFieldChange(
                                              fieldId,
                                              updatedArray
                                            );
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                              const updatedArray = [
                                ...((isMulti
                                  ? currentEntry[fieldId]
                                  : basicEntry[fieldId]) || []),
                                {},
                              ];
                              if (isMulti)
                                handleFieldChange(fieldId, updatedArray);
                              else
                                handleBasicFieldChange(fieldId, updatedArray);
                            }}
                          >
                            Add Treatment Method
                          </Button>
                        </div>
                      ) : (
                        // <TextField
                        //   type={q.type === "number" ? "number" : "text"}
                        //   variant="outlined"
                        //   fullWidth
                        //   value={
                        //     isMulti
                        //       ? currentEntry[fieldId] || ""
                        //       : basicEntry[fieldId] || ""
                        //   }
                        //   onChange={(e) =>
                        //     isMulti
                        //       ? handleFieldChange(fieldId, e.target.value)
                        //       : handleBasicFieldChange(fieldId, e.target.value)
                        //   }
                        // />
                        (() => {
                          // const defaultValue = q.value === "default" ? totalConsumption ?? "" : "";
                          const defaultValue =
                            q.value === "default"
                              ? subcategory === "Purchased Electricity"
                                ? lastEnergy ?? ""
                                : totalConsumption ?? ""
                              : "";

                          const fieldId = `${subcategory.replace(
                            /\s+/g,
                            ""
                          )}_Q${index + 1}`;
                          const currentValue = isMulti
                            ? currentEntry[fieldId] ?? defaultValue
                            : basicEntry[fieldId] ?? defaultValue;

                          return (
                            <TextField
                              type={q.type === "number" ? "number" : "text"}
                              variant="outlined"
                              fullWidth
                              value={currentValue}
                              onChange={(e) =>
                                isMulti
                                  ? handleFieldChange(fieldId, e.target.value)
                                  : handleBasicFieldChange(
                                      fieldId,
                                      e.target.value
                                    )
                              }
                            />
                          );
                        })()
                      )}
                    </div>
                  );
                });
              })()}
              {isMultiEntry && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddEntry}
                    style={{ marginTop: "10px" }}
                  >
                    Add
                  </Button>
                  {entries.length > 0 && (
                    <TableContainer
                      component={Paper}
                      style={{ marginTop: "20px" }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            {questions.map((q, index) => (
                              <TableCell key={index}>{q.question}</TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {entries.map((entry, index) => (
                            <TableRow key={index}>
                              {questions.map((q, qIndex) => {
                                const fieldId = `${subcategory.replace(
                                  /\s+/g,
                                  ""
                                )}_Q${qIndex + 1}`;
                                const value = entry[fieldId];

                                let displayValue = "";

                                // Handle array of objects (e.g., Treatment Methods & Percentages)
                                if (Array.isArray(value)) {
                                  // Try to detect treatment method & percentage fields
                                  const lines = value.map((item) => {
                                    const method = Object.entries(item).find(
                                      ([key]) => key.includes("_F1")
                                    );
                                    const percentage = Object.entries(
                                      item
                                    ).find(([key]) => key.includes("_F2"));
                                    return method && percentage
                                      ? `${method[1]}: ${percentage[1]}`
                                      : JSON.stringify(item);
                                  });
                                  displayValue = lines.join("\n");
                                } else if (
                                  typeof value === "object" &&
                                  value !== null
                                ) {
                                  displayValue = Object.entries(value)
                                    .map(([k, v]) => `${k}: ${v}`)
                                    .join(", ");
                                } else {
                                  displayValue = value;
                                }

                                return (
                                  <TableCell
                                    key={qIndex}
                                    style={{ whiteSpace: "pre-line" }}
                                  >
                                    {displayValue}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              )}
            </>
          )}
        </AccordionDetails>
        <MobileCombustionEmissionDialog
          open={openEmissionDialog}
          handleClose={() => setOpenEmissionDialog(false)}
          userId={userId}
        />
        <StationaryCombustionEmissionDialog
          open={openStationaryDialog}
          handleClose={() => setOpenStationaryDialog(false)}
          userId={userId}
        />
        <IndustrialProcessEmissionDialog
          open={openIndustrialDialog}
          handleClose={() => setOpenIndustrialDialog(false)}
          userId={userId}
        />
        <FugitiveEmissionDialog
          open={openFugitiveDialog}
          handleClose={() => setOpenFugitiveDialog(false)}
          userId={userId}
        />
        <PurchasedElectricityDialog
          open={openPurchasedElectricityDialog}
          handleClose={() => setOpenPurchasedElectricityDialog(false)}
          userId={userId}
        />
        <PurchasedSteamHeatCoolingEmissionDialog
          open={openPurchasedSteamDialog}
          handleClose={() => setOpenPurchasedSteamDialog(false)}
          userId={userId}
        />
        <PurchasedGoodsServicesDialog
          open={openPurchasedGoodsServicesDialog}
          handleClose={() => setOpenPurchasedGoodsServicesDialog(false)}
          userId={userId}
        />
        <UseSoldProductEmissionDialog
          open={openUseofSoldProductsDialog}
          handleClose={() => setOpenUseofSoldProductsDialog(false)}
          userId={userId}
        />
        <EndOfLifeTreatmentDialog
          open={openEndofLifeTreatmentDialog}
          handleClose={() => setOpenEndofLifeTreatmentDialog(false)}
          userId={userId}
        />
        <UserCustomEmissionFactorDialog
          open={openCustomFactorDialog}
          handleClose={() => setOpenCustomFactorDialog(false)}
          userId={userId}
        />
        <WaterUseWaterTreatmentDialog
          open={openWaterUseWaterTreatmentDialog}
          handleClose={() => setOpenWaterUseWaterTreatmentDialog(false)}
          userName={userName}
        />
        <AddIndustrialProcessDialog
          open={openAddIndustrialDialog}
          onClose={() => setOpenAddIndustrialDialog(false)}
        />
        <AddRefrigerantDialog
          open={openAddRefrigerantDialog}
          onClose={() => setOpenAddRefrigerantDialog(false)}
        />
      </Accordion>
    </div>
  );
};

export default EnvironmentSec;
