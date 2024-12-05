// import React, { useState, useCallback } from "react";
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
//   DialogActions,
//   TextField,
//   Chip,
//   Box,
// } from "@mui/material";

// const FlowChart = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: "head",
//       data: { label: "Head Node", details: "Details of the head node" },
//       position: { x: 250, y: 50 },
//     },
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     label: "",
//     details1: "",
//     details2: "",
//     details3: "",
//     details4: "",
//   });

//   const onNodeClick = useCallback((event, node) => {
//     setSelectedNode(node);
//     setOpenDialog(true);
//   }, []);

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedNode(null);
//   };

//   const handleOpenDetailsDialog = (node) => {
//     setSelectedNode(node);
//     setOpenDetailsDialog(true);
//   };

//   const handleCloseDetailsDialog = () => {
//     setOpenDetailsDialog(false);
//     setSelectedNode(null);
//   };

//   const handleAddSubNode = () => {
//     if (!selectedNode) return;

//     const newNodeId = `node-${nodes.length + 1}`;
//     const newNode = {
//       id: newNodeId,
//       data: {
//         label: formData.label,
//         details: `1. ${formData.details1}, 2. ${formData.details2}, 3. ${formData.details3}, 4. ${formData.details4}`,
//       },
//       position: {
//         x: selectedNode.position.x + 200,
//         y:
//           selectedNode.position.y +
//           100 *
//             (nodes.filter((n) => n.parentNode === selectedNode.id).length + 1),
//       },
//       parentNode: selectedNode.id,
//     };
//     setNodes((nds) => [...nds, newNode]);
//     setEdges((eds) => [
//       ...eds,
//       {
//         id: `edge-${selectedNode.id}-${newNodeId}`,
//         source: selectedNode.id,
//         target: newNodeId,
//       },
//     ]);
//     setFormData({
//       label: "",
//       details1: "",
//       details2: "",
//       details3: "",
//       details4: "",
//     });
//     handleCloseDialog();
//   };

//   return (
//     <div style={{ height: "90vh", width: "100%" }}>
//       <ReactFlow
//         nodes={nodes.map((node) => ({
//           ...node,
//           data: {
//             ...node.data,
//             label: (
//               <Box>
//                 <div>{node.data.label}</div>
//                 <Chip
//                   label="Details"
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleOpenDetailsDialog(node);
//                   }}
//                   style={{ marginTop: "5px" }}
//                 />               
//               </Box>
//             ),
             
//           },
//         }))}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={onNodeClick}
//         fitView
//       >
//         <Background color="#aaa" gap={16} />
//         <Controls />
//       </ReactFlow>

//       {/* Dialog for adding sub-node */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
//         <DialogContent>
//           <h3>{selectedNode?.data?.label}</h3>
//           <TextField
//             label="Sub-node Label"
//             fullWidth
//             margin="normal"
//             value={formData.label}
//             onChange={(e) =>
//               setFormData({ ...formData, label: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 1"
//             fullWidth
//             margin="normal"
//             value={formData.details1}
//             onChange={(e) =>
//               setFormData({ ...formData, details1: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 2"
//             fullWidth
//             margin="normal"
//             value={formData.details2}
//             onChange={(e) =>
//               setFormData({ ...formData, details2: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 3"
//             fullWidth
//             margin="normal"
//             value={formData.details3}
//             onChange={(e) =>
//               setFormData({ ...formData, details3: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 4"
//             fullWidth
//             margin="normal"
//             value={formData.details4}
//             onChange={(e) =>
//               setFormData({ ...formData, details4: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddSubNode}
//           >
//             Add Sub-node
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog for viewing node details */}
//       <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
//         <DialogContent>
//           <h3>{selectedNode?.data?.label}</h3>
//           <p>{selectedNode?.data?.details}</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDetailsDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default FlowChart;


// import React, { useState, useCallback } from "react";
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
//   DialogActions,
//   TextField,
//   Chip,
//   Box,
// } from "@mui/material";

// const FlowChart = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([
//     {
//       id: "head",
//       data: { label: "Head Node", details: "Details of the head node" },
//       position: { x: 250, y: 50 },
//     },
//   ]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     label: "",
//     details1: "",
//     details2: "",
//     details3: "",
//     details4: "",
//   });

//   const onNodeClick = useCallback((event, node) => {
//     setSelectedNode(node);
//     setOpenDialog(true);
//   }, []);

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedNode(null);
//   };

//   const handleOpenDetailsDialog = (node) => {
//     setSelectedNode(node);
//     setOpenDetailsDialog(true);
//   };

//   const handleCloseDetailsDialog = () => {
//     setOpenDetailsDialog(false);
//     setSelectedNode(null);
//   };

//   const handleAddSubNode = () => {
//     if (!selectedNode) return;

//     const newNodeId = `node-${nodes.length + 1}`;
//     const newNode = {
//       id: newNodeId,
//       data: {
//         label: formData.label,
//         details: `1. ${formData.details1}, 2. ${formData.details2}, 3. ${formData.details3}, 4. ${formData.details4}`,
//       },
//       position: {
//         x: selectedNode.position.x + 200,
//         y:
//           selectedNode.position.y +
//           100 *
//             (nodes.filter((n) => n.parentNode === selectedNode.id).length + 1),
//       },
//       parentNode: selectedNode.id,
//     };
//     setNodes((nds) => [...nds, newNode]);
//     setEdges((eds) => [
//       ...eds,
//       {
//         id: `edge-${selectedNode.id}-${newNodeId}`,
//         source: selectedNode.id,
//         target: newNodeId,
//       },
//     ]);
//     setFormData({
//       label: "",
//       details1: "",
//       details2: "",
//       details3: "",
//       details4: "",
//     });
//     handleCloseDialog();
//   };

//   const handleSaveFlowchart = () => {
//     const flowchartData = {
//       nodes,
//       edges,
//     };
//     localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
//     alert("Flowchart saved!");
//   };

//   const handleNodeDragStop = (_, node) => {
//     setNodes((nds) =>
//       nds.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
//     );
//   };

//   return (
//     <div style={{ height: "90vh", width: "100%" }}>
//       <ReactFlow
//         nodes={nodes.map((node) => ({
//           ...node,
//           data: {
//             ...node.data,
//             label: (
//               <Box>
//                 <div>{node.data.label}</div>
//                 <Chip
//                   label="Details"
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleOpenDetailsDialog(node);
//                   }}
//                   style={{ marginTop: "5px" }}
//                 />
//               </Box>
//             ),
//           },
//         }))}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={onNodeClick}
//         onNodeDragStop={handleNodeDragStop} // Track position changes
//         fitView
//       >
//         <Background color="#aaa" gap={16} />
//         <Controls />
//       </ReactFlow>

//       <div style={{ marginTop: "10px", textAlign: "center" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSaveFlowchart}
//         >
//           Save Flowchart
//         </Button>
//       </div>

//       {/* Dialog for adding sub-node */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
//         <DialogContent>
//           <h3>{selectedNode?.data?.label}</h3>
//           <TextField
//             label="Sub-node Label"
//             fullWidth
//             margin="normal"
//             value={formData.label}
//             onChange={(e) =>
//               setFormData({ ...formData, label: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 1"
//             fullWidth
//             margin="normal"
//             value={formData.details1}
//             onChange={(e) =>
//               setFormData({ ...formData, details1: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 2"
//             fullWidth
//             margin="normal"
//             value={formData.details2}
//             onChange={(e) =>
//               setFormData({ ...formData, details2: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 3"
//             fullWidth
//             margin="normal"
//             value={formData.details3}
//             onChange={(e) =>
//               setFormData({ ...formData, details3: e.target.value })
//             }
//           />
//           <TextField
//             label="Details 4"
//             fullWidth
//             margin="normal"
//             value={formData.details4}
//             onChange={(e) =>
//               setFormData({ ...formData, details4: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddSubNode}
//           >
//             Add Sub-node
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog for viewing node details */}
//       <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
//         <DialogContent>
//           <h3>{selectedNode?.data?.label}</h3>
//           <p>{selectedNode?.data?.details}</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDetailsDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default FlowChart;

import React, { useState, useCallback } from "react";
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
  DialogActions,
  TextField,
  Chip,
  Box,
} from "@mui/material";

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    details1: "",
    details2: "",
    details3: "",
    details4: "",
  });

  const handleOpenDialog = (node = null) => {
    setSelectedNode(node);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedNode(null);
  };

  const handleOpenDetailsDialog = (node) => {
    setSelectedNode(node);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedNode(null);
  };

  const handleAddNode = () => {
    const newNodeId = `node-${nodes.length + 1}`;
    const isHeadNode = !selectedNode;

    const newNode = {
      id: newNodeId,
      data: {
        label: formData.label,
        details: `1. ${formData.details1}, 2. ${formData.details2}, 3. ${formData.details3}, 4. ${formData.details4}`,
      },
      position: isHeadNode
        ? { x: 250, y: 50 } // Default position for head node
        : {
            x: selectedNode.position.x + 200,
            y:
              selectedNode.position.y +
              100 *
                (nodes.filter((n) => n.parentNode === selectedNode.id).length +
                  1),
          },
      ...(isHeadNode ? {} : { parentNode: selectedNode.id }),
    };

    setNodes((nds) => [...nds, newNode]);

    if (!isHeadNode) {
      setEdges((eds) => [
        ...eds,
        {
          id: `edge-${selectedNode.id}-${newNodeId}`,
          source: selectedNode.id,
          target: newNodeId,
        },
      ]);
    }

    setFormData({
      label: "",
      details1: "",
      details2: "",
      details3: "",
      details4: "",
    });
    handleCloseDialog();
  };

  const handleSaveFlowchart = () => {
    const flowchartData = {
      nodes,
      edges,
    };
    localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
    alert("Flowchart saved!");
  };

  const handleNodeDragStop = (_, node) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
    );
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      {nodes.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
          >
            Add Head Node
          </Button>
        </div>
      ) : (
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              label: (
                <Box>
                  <div>{node.data.label}</div>
                  <Chip
                    label="Details"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetailsDialog(node);
                    }}
                    style={{ marginTop: "5px" }}
                  />
                </Box>
              ),
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(_, node) => handleOpenDialog(node)}
          onNodeDragStop={handleNodeDragStop}
          fitView
        >
          <Background color="#aaa" gap={16} />
          <Controls />
        </ReactFlow>
      )}

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveFlowchart}
        >
          Save Flowchart
        </Button>
      </div>

      {/* Dialog for adding nodes */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogContent>
          <h3>{selectedNode ? "Add Sub-node" : "Add Head Node"}</h3>
          <TextField
            label="Node Label"
            fullWidth
            margin="normal"
            value={formData.label}
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
          />
          <TextField
            label="Details 1"
            fullWidth
            margin="normal"
            value={formData.details1}
            onChange={(e) =>
              setFormData({ ...formData, details1: e.target.value })
            }
          />
          <TextField
            label="Details 2"
            fullWidth
            margin="normal"
            value={formData.details2}
            onChange={(e) =>
              setFormData({ ...formData, details2: e.target.value })
            }
          />
          <TextField
            label="Details 3"
            fullWidth
            margin="normal"
            value={formData.details3}
            onChange={(e) =>
              setFormData({ ...formData, details3: e.target.value })
            }
          />
          <TextField
            label="Details 4"
            fullWidth
            margin="normal"
            value={formData.details4}
            onChange={(e) =>
              setFormData({ ...formData, details4: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleAddNode}>
            {selectedNode ? "Add Sub-node" : "Add Head Node"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for viewing node details */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogContent>
          <h3>{selectedNode?.data?.label}</h3>
          <p>{selectedNode?.data?.details}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FlowChart;






