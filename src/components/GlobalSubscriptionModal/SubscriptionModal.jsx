// components/SubscriptionModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';

const plans = [
  {
    name: 'ESG Basic',
    price: '₹4999',
    features: [
      'Limited to one report format (BRSR or GRI)',
      'Monthly decarbonization report generation with limited AI usage',
      'No external API integrations',
      'Covers all carbon accounting scopes (Scope 1, 2, 3)',
      'Supports up to 5GB of ESG-related data',
      'Email & knowledge base support',
    ],
  },
  {
    name: 'ESG Standard',
    price: '₹9999',
    features: [
      'Access to 3 report formats (BRSR, GRI, CDP)',
      'AI-driven sustainability insights & decarbonization roadmaps',
      'Access to external ESG data APIs',
      'Covers all carbon accounting scopes',
      'Supports up to 20GB of ESG-related data',
      'Automated regulatory compliance alerts',
      'Priority email & phone support',
    ],
  },
  {
    name: 'ESG Premium',
    price: '₹19999',
    features: [
      'Access to all major report formats (BRSR, GRI, CDP, SASB, TCFD)',
      'Automated decarbonization strategies and AI-generated action plans',
      'Full API access for seamless third-party integrations',
      'Covers all carbon accounting scopes with detailed breakdowns',
      'Supports up to 50GB of ESG-related data',
      'Includes asset tracking & carbon offset portfolio management',
      'Real-time compliance updates & risk forecasting',
      'Dedicated account manager & 24/7 support',
    ],
  },
];

const SubscriptionModal = ({ open }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const subscriptionPlan = useSelector((state) => state.auth.user?.subscription);

  const getDialogTitle = () => {
    return `${subscriptionPlan.plan} Subscription Expired`;
  };

  const getDialogMessage = () => {
    return `Your ${subscriptionPlan.plan} plan has ended. Please choose a subscription plan to continue.`;
  };

  return (
    <Dialog open={open} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', color: '#D32F2F', textAlign: 'center' }}>
        {getDialogTitle()}
      </DialogTitle>
      <DialogContent>
        <Typography align="center" color="text.secondary" mb={4}>
          {getDialogMessage()}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={selectedPlan === index ? 6 : 2}
                sx={{
                  p: 3,
                  borderRadius: '12px',
                  border: selectedPlan === index ? '2px solid #1976D2' : '1px solid #ccc',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': { borderColor: '#1976D2' },
                }}
                onClick={() => setSelectedPlan(index)}
              >
                <Typography align="center" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2E7D32' }}>
                  {plan.name}
                </Typography>
                <Typography align="center" sx={{ fontSize: '1.5rem', fontWeight: 'bold', mt: 1 }}>
                  {plan.price}
                </Typography>
                <Box mt={2}>
                  {plan.features.map((feature, i) => (
                    <Typography key={i} sx={{ fontSize: '0.9rem', color: '#555', mb: 1 }}>✓ {feature}</Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/payment')}
          disabled={selectedPlan === null}
        >
          Choose {selectedPlan !== null ? plans[selectedPlan].name : 'a Plan'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionModal;
