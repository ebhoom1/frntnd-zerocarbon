
// import React, { useState, useEffect } from "react";
// import ReactFlow, {
//   Background,
//   Controls,
//   useNodesState,
//   useEdgesState,
// } from "react-flow-renderer";
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   TextField,
//   MenuItem,
//   Box,
//   ListSubheader,
// } from "@mui/material";
// import { useSelector } from "react-redux";
// import axios from "../../../api/axios";
// import DetailsDialog from "../../../pages/Admin/sampleFlowchart/DetailsDialog";

// const SampleFlowchart = () => {
//   const userId = useSelector((state) => state.auth.user?.id); // Retrieve userId from Redux state
//   console.log("userId:",userId);
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [hoveredNode, setHoveredNode] = useState(null);
//   const [detailsDialog, setDetailsDialog] = useState({
//     open: false,
//     details: null,
//     type: "",
//   });
//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     node: null,
//   });

//   // Right-click context menu
//   const handleNodeContextMenu = (event, node) => {
//     event.preventDefault(); // Prevent the default browser context menu
//     setContextMenu({
//       visible: true,
//       x: event.clientX,
//       y: event.clientY,
//       node,
//     });
//   };

//   const handleCloseContextMenu = () => {
//     setContextMenu({ visible: false, x: 0, y: 0, node: null });
//   };

//   const handleNodeHover = (nodeId) => {
//     setHoveredNode(nodeId); // Use node ID to manage the hover state
//   };

//   const handleNodeLeave = () => {
//     setHoveredNode(null); // Clear the hover state when leaving the node
//   };

//   const handleDetailsClick = (event, node, type) => {
//     event.stopPropagation();
//     setDetailsDialog({
//       open: true,
//       details:
//         type === "scopeDetails"
//           ? node.data.details.scopeDetails
//           : node.data.details.boundaryDetails,
//       type,
//     });
//   };

//   const handleDialogClose = () => {
//     setDetailsDialog({ open: false, title: "", details: {} });
//   };

//   useEffect(() => {
//     // Fetch existing flowchart for the user
//     const fetchFlowchart = async () => {
//       try {
//         const response = await axios.get(`/api/flowchart/get/${userId}`);
//         setNodes(response.data.nodes);
//         setEdges(response.data.edges);
//         console.log("responses:",response.data);
//       } catch (error) {
//         console.error("Error fetching flowchart:", error);
//       }
//     };

//     if (userId) fetchFlowchart();
//   }, [userId]);

//   const handleDeleteNode = async () => {
//     if (!contextMenu.node) return;

//     const nodeId = contextMenu.node.id; // Get the ID of the node to delete

//     try {
//       // Send a request to the backend to delete the node and its edges
//       await axios.delete("/api/flowchart/admin/delete", {
//         data: { userId, nodeId },
//       });

//       // Remove the node and associated edges from the state
//       setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
//       setEdges((prevEdges) =>
//         prevEdges.filter(
//           (edge) => edge.source !== nodeId && edge.target !== nodeId
//         )
//       );

//       alert("Node and associated edges deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting node:", error);
//       alert("Failed to delete node.");
//     }

//     handleCloseContextMenu(); // Close the context menu
//   };

//   return (
//     <div
//       style={{ height: "90vh", width: "100%" }}
//       onClick={handleCloseContextMenu} // Close the context menu when clicking outside
//     >
//       <ReactFlow
//         nodes={nodes.map((node) => ({
//           ...node,
//           data: {
//             ...node.data,
//             label: (
//               <div
//                 onContextMenu={(event) => handleNodeContextMenu(event, node)} // Attach right-click handler
//                 onMouseEnter={() => handleNodeHover(node.id)}
//                 onMouseLeave={handleNodeLeave}
//                 style={{ position: "relative" }}
//               >
//                 {node.data.label}
//                 {hoveredNode === node.id && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "-8px",
//                       display: "flex",
//                       gap: "8px",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       marginLeft: "5px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "10px",
//                         height: "10px",
//                         backgroundColor: "blue",
//                         borderRadius: "50%",
//                         cursor: "pointer",
//                         marginBottom: "5px",
//                       }}
//                       onClick={(event) =>
//                         handleDetailsClick(event, node, "scopeDetails")
//                       }
//                     />
//                     <div
//                       style={{
//                         width: "10px",
//                         height: "10px",
//                         backgroundColor: "green",
//                         borderRadius: "50%",
//                         cursor: "pointer",
//                       }}
//                       onClick={(event) =>
//                         handleDetailsClick(event, node, "boundaryDetails")
//                       }
//                     />
//                   </div>
//                 )}
//               </div>
//             ),
//           },
//         }))}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeMouseEnter={handleNodeHover}
//         onNodeMouseLeave={handleNodeLeave}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>

//       {/* Right-click context menu */}
//       {contextMenu.visible && (
//         <div
//           style={{
//             position: "absolute",
//             top: contextMenu.y,
//             left: contextMenu.x,
//             backgroundColor: "white",
//             boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
//             borderRadius: "4px",
//             zIndex: 10,
//           }}
//         >
//           <Button
//             onClick={handleDeleteNode}
//             style={{
//               fontSize: "18px",
//               display: "block",
//               padding: "16px 20px",
//               width: "100%",
//             }}
//           >
//             Delete
//           </Button>
//         </div>
//       )}

//       {/* Reusable dialog for details */}
//       <DetailsDialog
//         open={detailsDialog.open}
//         onClose={handleDialogClose}
//         title={detailsDialog.title}
//         details={detailsDialog.details}
//       />
//     </div>
//   );
// };

// export default SampleFlowchart;

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
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import categories from "../../../assets/data/categories.json";
import subCategories from "../../../assets/data/subCategories.json";
import DetailsDialog from "../../../pages/Admin/sampleFlowchart/DetailsDialog";

const SampleFlowchart = () => {
  const userId = useSelector((state) => state.auth.user?.id); // Retrieve userId from Redux
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);
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
  const [openDialog, setOpenDialog] = useState(false);

  // Handle right-click context menu
  const handleNodeContextMenu = (event, node) => {
    event.preventDefault(); // Prevent default browser context menu
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
    setHoveredNode(nodeId); // Manage hover state by node ID
  };

  const handleNodeLeave = () => {
    setHoveredNode(null); // Clear hover state
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

  const handleDialogClose = () => {
    setDetailsDialog({ open: false, title: "", details: {} });
  };

  // Open dialog for updating a node
  const openUpdateDialog = () => {
    if (!contextMenu.node) return;

    const node = contextMenu.node;
    setClickedNode(node.id);
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
    setOpenDialog(true);
    handleCloseContextMenu();
  };

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

  const handleScopeInputChange = (index, field, value) => {
    const updatedScopes = [...formData.scopeDetails];
    updatedScopes[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      scopeDetails: updatedScopes,
    }));
  };

  // Handle updating a node
  const handleUpdateNode = async () => {
    if (!clickedNode) return;

    const updatedNode = {
      id: clickedNode,
      label: formData.label,
      details: {
        boundaryDetails: formData.boundaryDetails,
        scopeDetails: formData.scopeDetails,
      },
    };

    // Update the node in local state
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

  // Handle deleting a node
  const handleDeleteNode = async () => {
    if (!contextMenu.node) return;

    const nodeId = contextMenu.node.id;

    try {
      await axios.delete("/api/flowchart/admin/delete", {
        data: { userId, nodeId },
      });

      // Update local state by removing the node and its edges
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

    handleCloseContextMenu();
  };

  // Fetch existing flowchart data
  useEffect(() => {
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

  return (
    <div
      style={{ height: "90vh", width: "100%" }}
      onClick={handleCloseContextMenu}
    >
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            label: (
              <div
                onContextMenu={(event) => handleNodeContextMenu(event, node)}
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
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Context menu */}
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
            style={{ fontSize: "18px", padding: "16px 20px" }}
          >
            Update
          </Button>
          <Button
            onClick={handleDeleteNode}
            style={{ fontSize: "18px", padding: "16px 20px" }}
          >
            Delete
          </Button>
        </div>
      )}

      {/* Reusable dialog for node details */}
      <DetailsDialog
        open={detailsDialog.open}
        onClose={handleDialogClose}
        title={detailsDialog.title}
        details={detailsDialog.details}
      />

      {/* Update dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogContent>
    <h3>Update</h3>
    {/* Node Label */}
    <TextField
      label="Boundary Name"
      value={formData.label}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          label: e.target.value,
        }))
      }
      fullWidth
      margin="normal"
    />
    {/* Boundary Details */}
    <h4>Boundary Details</h4>
    <TextField
      select
      label="Boundary Type"
      name="boundaryType"
      value={formData.boundaryDetails.boundaryType}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          boundaryDetails: {
            ...prevData.boundaryDetails,
            boundaryType: e.target.value,
          },
        }))
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
        setFormData((prevData) => ({
          ...prevData,
          boundaryDetails: {
            ...prevData.boundaryDetails,
            controlApproach: e.target.value,
          },
        }))
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
        setFormData((prevData) => ({
          ...prevData,
          boundaryDetails: {
            ...prevData.boundaryDetails,
            location: e.target.value,
          },
        }))
      }
      fullWidth
      margin="normal"
    />
    <TextField
      label="Boundary Comments"
      name="boundaryComments"
      value={formData.boundaryDetails.boundaryComments}
      onChange={(e) =>
        setFormData((prevData) => ({
          ...prevData,
          boundaryDetails: {
            ...prevData.boundaryDetails,
            boundaryComments: e.target.value,
          },
        }))
      }
      multiline
      rows={3}
      fullWidth
      margin="normal"
    />
    {/* Scope Details */}
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
          {Object.keys(categories).map((scopeType) => (
            <MenuItem key={scopeType} value={scopeType}>
              {scopeType}
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
          onChange={(e) =>
            handleScopeInputChange(index, "emissionFactor", e.target.value)
          }
          fullWidth
          margin="normal"
        >
          <MenuItem value="DEFRA">DEFRA</MenuItem>
          <MenuItem value="IPCC">IPCC</MenuItem>
          <MenuItem value="kg CO₂e / liter">kg CO₂e / liter</MenuItem>
          <MenuItem value="kg CO₂e / tonne">kg CO₂e / tonne</MenuItem>
        </TextField>
        {["kg CO₂e / liter", "kg CO₂e / tonne"].some((unit) =>
          scope.emissionFactor.includes(unit)
        ) && (
          <TextField
            label={`Enter Value (${scope.emissionFactor
              .replace(/^\d+/, "")
              .trim()})`}
            value={scope.emissionFactor.match(/^\d+/)?.[0] || ""}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^\d]/g, ""); // Numeric value
              const unit = scope.emissionFactor.replace(/^\d*/, "").trim();
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
    <Button
      onClick={handleUpdateNode}
      color="primary"
    >
     Save changes
    </Button>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default SampleFlowchart;
