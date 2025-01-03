
import React, { useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  Box,
  ListSubheader,
} from "@mui/material";
import axios from "../../../api/axios";
import categories from "../../../assets/data/categories.json";
import subCategories from "../../../assets/data/subCategories.json";
import DetailsDialog from "./DetailsDialog";
import { useParams } from "react-router-dom";
const SampleFlowchart = () => {
  const { userId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    boundaryDetails: {
      boundaryType: "",
      controlApproach: "",
      location: "",
      boundaryComments: "",
    },
    scopeDetails: [
      {
        scopeType: "",
        category: "",
        subCategory: "",
        units: "",
        emissionFactor: "",
        scopeComments: "",
      },
    ],
  });
  const [nodeToConnect, setNodeToConnect] = useState(null); 
  const [clickedNode, setClickedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [detailsDialog, setDetailsDialog] = useState({
    open: false,
    details: null,
    type: "",
  });
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });

  //rightclick
  const handleNodeContextMenu = (event, node) => {
    event.preventDefault(); // Prevent the default browser context menu
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      node,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, node: null });
  };

  const handleNodeHover = (nodeId) => {
    setHoveredNode(nodeId); // Use node ID to manage the hover state
  };

  const handleNodeLeave = () => {
    setHoveredNode(null); // Clear the hover state when leaving the node
  };
  const handleDetailsClick = (event, node, type) => {
    event.stopPropagation();
    setDetailsDialog({
      open: true,
      details:
        type === "scopeDetails"
          ? node.data.details.scopeDetails
          : node.data.details.boundaryDetails,
      type,
    });
  };

  const openUpdateDialog = () => {
    if (!contextMenu.node) return;

    const node = contextMenu.node;
    setClickedNode(node.id); // Set the clickedNode to the selected node's ID
    setFormData({
      label: node.data.label || "",
      boundaryDetails: node.data.details.boundaryDetails || {
        boundaryType: "",
        controlApproach: "",
        location: "",
        boundaryComments: "",
      },
      scopeDetails: node.data.details.scopeDetails || [
        {
          scopeType: "",
          category: "",
          subCategory: "",
          units: "",
          emissionFactor: "",
          scopeComments: "",
        },
      ],
    });
    setOpenDialog(true); // Open the dialog
    handleCloseContextMenu(); // Close the context menu
  };

  //details

  const handleDialogClose = () => {
    setDetailsDialog({ open: false, title: "", details: {} });
  };

  const handleNodeClick = (event, node) => {
    event.stopPropagation(); // Prevent event bubbling
    setNodeToConnect(node.id); // Set nodeToConnect for adding connections
    setClickedNode(null);     
    setFormData({
      label: "",
      boundaryDetails: {
        boundaryType: "",
        controlApproach: "",
        location: "",
        boundaryComments: "",
      },
      scopeDetails: [
        {
          scopeType: "",
          category: "",
          subCategory: "",
          units: "",
          emissionFactor: "",
          scopeComments: "",
        },
      ],
    });
    setOpenDialog(true); // Open the dialog for adding a node
  };

  useEffect(() => {
    // Fetch existing flowchart for the user
    const fetchFlowchart = async () => {
      try {
        const response = await axios.get(`/api/flowchart/get/${userId}`);
        setNodes(response.data.nodes);
        setEdges(response.data.edges);
       
      } catch (error) {
        console.error("Error fetching flowchart:", error);
      }
    };

    if (userId) fetchFlowchart();
  }, [userId]);

  const handleAddScopeDetail = () => {
    setFormData((prevData) => ({
      ...prevData,
      scopeDetails: [
        ...prevData.scopeDetails,
        {
          scopeType: "",
          category: "",
          subCategory: "",
          units: "",
          emissionFactor: "",
          scopeComments: "",
        },
      ],
    }));
  };

  const handleRemoveScopeDetail = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      scopeDetails: prevData.scopeDetails.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleScopeInputChange = (index, field, value) => {
    const updatedScopes = [...formData.scopeDetails];
    updatedScopes[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      scopeDetails: updatedScopes,
    }));
  };

  const handleAddNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      data: {
        label: formData.label,
        details: {
          boundaryDetails: formData.boundaryDetails || {},
          scopeDetails: formData.scopeDetails || [],
        },
      },
      position: { x: 250, y: 100 * (nodes.length + 1) },
    };

    setNodes((nds) => [...nds, newNode]);

    if (nodeToConnect) {//automatically connect edge
      const newEdge = {
        id: `edge-${edges.length + 1}`,
        source: nodeToConnect,
        target: newNode.id,
      };
      setEdges((eds) => [...eds, newEdge]);
    }

    setOpenDialog(false);
    setFormData({
      label: "",
      boundaryDetails: {
        boundaryType: "",
        controlApproach: "",
        location: "",
        boundaryComments: "",
      },
      scopeDetails: [
        {
          scopeType: "",
          category: "",
          subCategory: "",
          units: "",
          emissionFactor: "",
          scopeComments: "",
        },
      ],
    });
  };

  const handleSaveFlowchart = async () => {
    const flowchartData = {
      nodes: nodes.map((node) => ({
        id: node.id,
        label: node.data.label,
        position: node.position,
        parentNode: node.parentNode || null,
        details: node.data.details,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })),
    };
    console.log("flowchartData:", flowchartData);
    try {
      await axios.post("/api/flowchart/save", { userId, flowchartData });
      console.log("userId:", userId);
      alert("Flowchart saved successfully!");
    } catch (error) {
      console.error("Error saving flowchart:", error);
      alert("Error saving flowchart.");
    }
  };

  //update
  const handleUpdateNode = async () => {
    if (!clickedNode) return;

    const updatedNode = {
      id: clickedNode,
      label: formData.label,
      // position: updatedNode?.position,
      details: {
        boundaryDetails: formData.boundaryDetails,
        scopeDetails: formData.scopeDetails,
      },
    };

    // Update the node in the local state
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === clickedNode
          ? {
              ...node,
              data: {
                ...node.data,
                label: updatedNode.label,
                details: updatedNode.details,
              },
            }
          : node
      )
    );

    try {
      // Send updated node to the backend
      await axios.patch("/api/flowchart/admin/update", {
        userId,
        nodeId: clickedNode,
        updatedData: updatedNode,
      });
      alert("Node updated successfully!");
    } catch (error) {
      console.error("Error updating node:", error);
      alert("Failed to update node.");
    }

    // Reset dialog state
    setOpenDialog(false);
    setFormData({
      label: "",
      boundaryDetails: {
        boundaryType: "",
        controlApproach: "",
        location: "",
        boundaryComments: "",
      },
      scopeDetails: [
        {
          scopeType: "",
          category: "",
          subCategory: "",
          units: "",
          emissionFactor: "",
          scopeComments: "",
        },
      ],
    });
    setClickedNode(null);
  };


  const handleDeleteNode = async () => {
    if (!contextMenu.node) return;
  
    const nodeId = contextMenu.node.id; // Get the ID of the node to delete
  
    try {
      // Send a request to the backend to delete the node and its edges
      await axios.delete("/api/flowchart/admin/delete", {
        data: { userId, nodeId },
      });
  
      // Remove the node and associated edges from the state
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        )
      );
  
      alert("Node and associated edges deleted successfully!");
    } catch (error) {
      console.error("Error deleting node:", error);
      alert("Failed to delete node.");
    }
  
    handleCloseContextMenu(); // Close the context menu
  };
  
  console.log("nodes:",nodes);
  console.log("edges:",edges);
  console.log("userId:",userId);
  return (
    <div
      style={{ height: "90vh", width: "100%" }}
      onClick={handleCloseContextMenu} // Close the context menu when clicking outside
    >
      <ReactFlow
        // nodes={nodes}
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label: (
              <div
                onContextMenu={(event) => handleNodeContextMenu(event, node)} // Attach right-click handler
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={handleNodeLeave}
                style={{ position: "relative" }}
              >
                {node.data.label}
                {hoveredNode === node.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      // right: "-10px",
                      display: "flex",
                      gap: "8px",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "blue",
                        borderRadius: "50%",
                        cursor: "pointer",
                        marginBottom: "5px",
                      }}
                      onClick={(event) =>
                        handleDetailsClick(event, node, "scopeDetails")
                      }
                    />
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "green",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={(event) =>
                        handleDetailsClick(event, node, "boundaryDetails")
                      }
                    />
                  </div>
                )}
              </div>
            ),
          },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeMouseEnter={handleNodeHover}
        onNodeMouseLeave={handleNodeLeave}
        onNodeClick={handleNodeClick} // Attach node click handler
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {/* right click options */}
      {contextMenu.visible && (
        <div
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
            borderRadius: "4px",
            zIndex: 10,
          }}
        >
          <Button
            onClick={openUpdateDialog}
            style={{
              fontSize: "18px",
              display: "block",
              padding: "16px 20px",
              width: "100%",
            }}
          >
            Update
          </Button>
          <Button
            onClick={handleDeleteNode}
            style={{
              fontSize: "18px",
              display: "block",
              padding: "16px 20px",
              width: "100%",
            }}
          >
            Delete
          </Button>
        </div>
      )}

      {/* Reusable dialog for details */}
      <DetailsDialog
        open={detailsDialog.open}
        onClose={handleDialogClose}
        title={detailsDialog.title}
        details={detailsDialog.details}
      />

      <Button onClick={() => setOpenDialog(true)}>Add Node</Button>
      <Button onClick={handleSaveFlowchart}>Save Flowchart</Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <h3>{clickedNode ? "Update Node" : "Add Node"}</h3>
          <TextField
            label="Node Label"
            value={formData.label}
            onChange={(e) => handleInputChange("label", e.target.value)}
            fullWidth
            margin="normal"
          />
          <h4>Boundary Details</h4>
          <TextField
            select
            label="Boundary Type"
            name="boundaryType"
            value={formData.boundaryDetails.boundaryType}
            onChange={(e) =>
              handleInputChange("boundaryDetails", {
                ...formData.boundaryDetails,
                boundaryType: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          >
            <MenuItem value="Physical">Physical</MenuItem>
            <MenuItem value="Legal">Legal</MenuItem>
          </TextField>
          <TextField
            select
            label="Control Approach"
            name="controlApproach"
            value={formData.boundaryDetails.controlApproach}
            onChange={(e) =>
              handleInputChange("boundaryDetails", {
                ...formData.boundaryDetails,
                controlApproach: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          >
            <MenuItem value="Financial">Financial</MenuItem>
            <MenuItem value="Operational">Operational</MenuItem>
            <MenuItem value="Equity Share">Equity Share</MenuItem>
          </TextField>
          <TextField
            label="Location"
            name="location"
            value={formData.boundaryDetails.location}
            onChange={(e) =>
              handleInputChange("boundaryDetails", {
                ...formData.boundaryDetails,
                location: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Boundary Comments"
            name="boundaryComments"
            value={formData.boundaryDetails.boundaryComments}
            onChange={(e) =>
              handleInputChange("boundaryDetails", {
                ...formData.boundaryDetails,
                boundaryComments: e.target.value,
              })
            }
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
          <h4>Scope Details</h4>
          {formData.scopeDetails.map((scope, index) => (
            <Box key={index}>
              <TextField
                select
                label="Scope Type"
                value={scope.scopeType}
                onChange={(e) =>
                  handleScopeInputChange(index, "scopeType", e.target.value)
                }
                fullWidth
                margin="normal"
              >
                {Object.keys(categories).map((scope) => (
                  <MenuItem key={scope} value={scope}>
                    {scope}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Category"
                name="category"
                value={scope.category}
                onChange={(e) =>
                  handleScopeInputChange(index, "category", e.target.value)
                }
                fullWidth
                margin="normal"
                disabled={!scope.scopeType}
              >
                {categories[scope.scopeType]?.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Subcategory"
                name="subCategory"
                value={scope.subCategory}
                onChange={(e) =>
                  handleScopeInputChange(index, "subCategory", e.target.value)
                }
                fullWidth
                margin="normal"
                disabled={!scope.category}
              >
                {subCategories[scope.category]?.map((subCategory) => (
                  <MenuItem key={subCategory} value={subCategory}>
                    {subCategory}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Units"
                name="units"
                value={scope.units}
                onChange={(e) =>
                  handleScopeInputChange(index, "units", e.target.value)
                }
                fullWidth
                margin="normal"
              >
                <MenuItem value="liters">Liters</MenuItem>
                <MenuItem value="tons">Tons</MenuItem>
                <MenuItem value="cubic meters">Cubic Meters</MenuItem>
                <MenuItem value="kWh">kWh</MenuItem>
              </TextField>

              <TextField
                select
                label="Emission Factor"
                name="emissionFactor"
                value={scope.emissionFactor}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === "kg CO₂e / liter" ||
                    value === "kg CO₂e / tonne"
                  ) {
                    handleScopeInputChange(
                      index,
                      "emissionFactor",
                      `0${value}`
                    ); // Default numeric value
                  } else {
                    handleScopeInputChange(index, "emissionFactor", value);
                  }
                }}
                fullWidth
                margin="normal"
              >
                <MenuItem value="DEFRA">DEFRA</MenuItem>
                <MenuItem value="IPCC">IPCC</MenuItem>
                <ListSubheader>Custom</ListSubheader>
                <MenuItem value="kg CO₂e / liter">kg CO₂e / liter</MenuItem>
                <MenuItem value="kg CO₂e / tonne">kg CO₂e / tonne</MenuItem>
              </TextField>

              {/* Conditionally render numeric input for custom emission factors */}
              {["kg CO₂e / liter", "kg CO₂e / tonne"].some((unit) =>
                scope.emissionFactor.includes(unit)
              ) && (
                <TextField
                  label={`Enter Value (${scope.emissionFactor
                    .replace(/^\d+/, "")
                    .trim()})`}
                  value={scope.emissionFactor.match(/^\d+/)?.[0] || ""}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d]/g, ""); // Ensure numeric value
                    const unit = scope.emissionFactor
                      .replace(/^\d*/, "")
                      .trim();
                    handleScopeInputChange(
                      index,
                      "emissionFactor",
                      `${numericValue}${unit}`
                    );
                  }}
                  type="number"
                  fullWidth
                  margin="normal"
                />
              )}

              <TextField
                label="Scope Comments"
                name="scopeComments"
                value={scope.scopeComments}
                onChange={(e) =>
                  handleScopeInputChange(index, "scopeComments", e.target.value)
                }
                multiline
                rows={3}
                fullWidth
                margin="normal"
              />

              <Button
                onClick={() => handleRemoveScopeDetail(index)}
                color="primary"
              >
                Remove Scope
              </Button>
            </Box>
          ))}
          <Button onClick={handleAddScopeDetail}>Add Scope</Button>
        </DialogContent>
        <Button
          onClick={clickedNode ? handleUpdateNode : handleAddNode}
          color="primary"
        >
          {clickedNode ? "Update Node" : "Add Node"}
        </Button>
      </Dialog>
    </div>
  );
};

export default SampleFlowchart;
