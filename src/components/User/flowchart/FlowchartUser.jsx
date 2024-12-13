
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
import { useSelector } from "react-redux";
import axios from "../../../api/axios";
import DetailsDialog from "../../../pages/Admin/sampleFlowchart/DetailsDialog";

const SampleFlowchart = () => {
  const userId = useSelector((state) => state.auth.user?.id); // Retrieve userId from Redux state
  console.log("userId:",userId);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  // Right-click context menu
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

  const handleDialogClose = () => {
    setDetailsDialog({ open: false, title: "", details: {} });
  };

  useEffect(() => {
    // Fetch existing flowchart for the user
    const fetchFlowchart = async () => {
      try {
        const response = await axios.get(`/api/flowchart/get/${userId}`);
        setNodes(response.data.nodes);
        setEdges(response.data.edges);
        console.log("responses:",response.data);
      } catch (error) {
        console.error("Error fetching flowchart:", error);
      }
    };

    if (userId) fetchFlowchart();
  }, [userId]);

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

  return (
    <div
      style={{ height: "90vh", width: "100%" }}
      onClick={handleCloseContextMenu} // Close the context menu when clicking outside
    >
      <ReactFlow
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
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* Right-click context menu */}
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
    </div>
  );
};

export default SampleFlowchart;
