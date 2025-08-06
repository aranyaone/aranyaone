// Integration Middleware for Next.js API Routes
// Automatically handles cross-service communication and data flows

import { ServicesIntegrationAPI } from '../../../lib/services-integration-api';

// Initialize integration on first load
let isInitialized = false;
let integrationAPI = null;

export function withIntegration(handler) {
  return async (req, res) => {
    // Initialize integration API if not already done
    if (!isInitialized) {
      integrationAPI = new ServicesIntegrationAPI();
      isInitialized = true;
    }

    // Add integration capabilities to request
    req.integration = {
      sendToService: async (targetService, data, options = {}) => {
        const sourceService = req.headers['x-source-service'] || 'unknown';
        return await integrationAPI.sendData(sourceService, targetService, data, options);
      },
      
      executeWorkflow: async (workflowId, triggerData = {}) => {
        return await integrationAPI.executeWorkflow(workflowId, triggerData);
      },
      
      getServiceHealth: (serviceId) => {
        return integrationAPI.getServiceHealth(serviceId);
      },
      
      getMetrics: () => {
        return integrationAPI.getMetrics();
      },

      // Cross-service AI coordination
      coordinateAI: async (services, task, data) => {
        const results = {};
        
        for (const service of services) {
          try {
            const result = await integrationAPI.sendData('coordinator', service, {
              task,
              data,
              timestamp: Date.now()
            });
            results[service] = result;
          } catch (error) {
            results[service] = { error: error.message };
          }
        }
        
        return results;
      },

      // Intelligent data aggregation
      aggregateData: async (sources, aggregationType = 'merge') => {
        const data = [];
        
        for (const source of sources) {
          try {
            const sourceData = await integrationAPI.sendData('aggregator', source, {
              request: 'get-data',
              timestamp: Date.now()
            });
            data.push({ source, data: sourceData });
          } catch (error) {
            data.push({ source, error: error.message });
          }
        }
        
        return aggregationType === 'merge' ? 
          data.reduce((acc, item) => ({ ...acc, [item.source]: item.data }), {}) :
          data;
      }
    };

    // Add response helpers for integration
    res.integration = {
      sendToServices: async (services, data) => {
        const results = await req.integration.coordinateAI(services, 'broadcast', data);
        res.json({ success: true, results });
      },
      
      executeWorkflow: async (workflowId, data) => {
        const result = await req.integration.executeWorkflow(workflowId, data);
        res.json({ success: true, workflow: workflowId, result });
      },
      
      healthCheck: () => {
        const metrics = req.integration.getMetrics();
        res.json({ 
          status: 'healthy',
          integration: {
            services: metrics.activeServices,
            dataFlows: metrics.activeDataFlows,
            workflows: metrics.activeWorkflows,
            successRate: metrics.successRate,
            averageLatency: metrics.averageLatency
          }
        });
      }
    };

    // Call the original handler
    return handler(req, res);
  };
}

// Specific API routes for integration
export default async function handler(req, res) {
  if (!isInitialized) {
    initializeServicesIntegration();
    isInitialized = true;
  }

  const { action } = req.query;

  switch (action) {
    case 'health':
      return res.json({
        status: 'healthy',
        services: Array.from(integrationAPI.services.keys()).map(serviceId => ({
          id: serviceId,
          ...integrationAPI.getServiceHealth(serviceId)
        })),
        metrics: integrationAPI.getMetrics()
      });

    case 'services':
      return res.json({
        services: Array.from(integrationAPI.services.values())
      });

    case 'dataflows':
      return res.json({
        dataFlows: Array.from(integrationAPI.dataFlows.values())
      });

    case 'workflows':
      return res.json({
        workflows: Array.from(integrationAPI.workflows.values())
      });

    case 'metrics':
      return res.json({
        metrics: integrationAPI.getMetrics()
      });

    case 'send-data':
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { source, target, data } = req.body;
      
      try {
        const result = await integrationAPI.sendData(source, target, data);
        return res.json({ success: true, result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case 'execute-workflow':
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { workflowId, triggerData } = req.body;
      
      try {
        const result = await integrationAPI.executeWorkflow(workflowId, triggerData);
        return res.json({ success: true, result });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case 'create-dataflow':
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { sourceService, targetService, config } = req.body;
      
      try {
        const flowId = integrationAPI.createDataFlow(sourceService, targetService, config);
        return res.json({ success: true, flowId });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case 'create-workflow':
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { workflowConfig } = req.body;
      
      try {
        const workflowId = integrationAPI.createWorkflow(workflowConfig);
        return res.json({ success: true, workflowId });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ error: 'Invalid action' });
  }
}
