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
    // scopeDetails: [
    //   {
    //     scopeType: "",
    //     category: "",
    //     subCategory: "",
    //     units: "",
    //     emissionFactor: "",
    //     fuel: "", // Added field
    //     activity: "", // Added field
    //     source: "", // Added field
    //     reference: "", // Added field
    //     scopeComments: "",
    //   },
    // ],
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
  // const handleNodeContextMenu = (event, node) => {
  //   event.preventDefault(); // Prevent default browser context menu
  //   const { clientX, clientY } = event;

  //   setContextMenu({
  //     visible: true,
  //     x:clientX,
  //     y:clientY,
  //     node,
  //   });
  // };

  const handleNodeContextMenu = (event, node) => {
    event.preventDefault(); // Prevent default browser context menu
  
    // Get the bounding rectangle of the container
    const container = document.querySelector('.react-flow'); // Adjust the selector as per your container
    const containerRect = container.getBoundingClientRect();
  
    const { clientX, clientY } = event;
  
    setContextMenu({
      visible: true,
      x: clientX - containerRect.left, // Adjust X position relative to container
      y: clientY - containerRect.top,  // Adjust Y position relative to container
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
          fuel: "", // Added field
          activity: "", // Added field
          source: "", // Added field
          reference: "", // Added field
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
  
    
  
    // Update the node locally in the flowchart state
    const updatedNode = {
      id: clickedNode,
      label: formData.label,
      details: {
        boundaryDetails: formData.boundaryDetails,
        scopeDetails: formData.scopeDetails,
      },
    };
  
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
      // Send updated node to backend (Flowchart update API)
      await axios.patch("/api/flowchart/admin/update", {
        userId,
        nodeId: clickedNode,
        updatedData: updatedNode,
      });
  
     
  
      // alert("Node updated and calculation data updated successfully!");
    } catch (error) {
      console.error("Error updating node or updating calculation data:", error);
      // alert("Failed to update node or calculation data.");
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
          fuel: "",
          activity: "",
          source: "",
          reference: "",
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
                    {/* <div
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
                    /> */}
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
            top: `${contextMenu.y}px`, // Dynamically set the top position
            left: `${contextMenu.x}px`, // Dynamically set the left position
            backgroundColor: "white",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
            borderRadius: "4px",
            zIndex: 10,
          }}
          onClick={(e) => e.stopPropagation()} // Prevent menu clicks from propagating

        >
          <Button
            onClick={openUpdateDialog}
            style={{ fontSize: "18px", padding: "16px 20px", display: "block", }}
          >
            Update
          </Button>
          <Button
            onClick={handleDeleteNode}
            style={{ fontSize: "18px", padding: "16px 20px" ,  display: "block",}}
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
       
          <Button onClick={handleUpdateNode} color="primary">
            Save changes
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SampleFlowchart;
