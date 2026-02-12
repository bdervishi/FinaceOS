-- Agent Task System Schema
-- Run this in Supabase SQL Editor

-- Task types for each agent
ALTER TABLE agents ADD COLUMN task_type TEXT DEFAULT 'general';
ALTER TABLE agents ADD COLUMN capabilities TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Update agent capabilities
UPDATE agents SET 
  task_type = 'analysis',
  capabilities = ARRAY['analyze_business', 'market_research', 'competitor_analysis', 'financial_modeling']
WHERE type = 'business';

UPDATE agents SET 
  task_type = 'development',
  capabilities = ARRAY['write_code', 'refactor', 'debug', 'code_review', 'write_tests']
WHERE type = 'development';

UPDATE agents SET 
  task_type = 'testing',
  capabilities = ARRAY['unit_tests', 'integration_tests', 'e2e_tests', 'security_audit', 'performance_test']
WHERE type = 'testing';

UPDATE agents SET 
  task_type = 'marketing',
  capabilities = ARRAY['gtm_strategy', 'content_marketing', 'seo', 'social_media', 'email_campaigns', 'brand_strategy']
WHERE type = 'marketing';

UPDATE agents SET 
  task_type = 'sales',
  capabilities = ARRAY['lead_generation', 'cold_outreach', 'pitch_development', 'negotiation', 'closing']
WHERE type = 'sales';

UPDATE agents SET 
  task_type = 'finance',
  capabilities = ARRAY['roi_analysis', 'cost_optimization', 'revenue_forecast', 'budget_planning', 'investment_analysis']
WHERE type = 'finance';

UPDATE agents SET 
  task_type = 'operations',
  capabilities = ARRAY['process_optimization', 'workflow_automation', 'compliance_check', 'risk_management', 'vendor_management']
WHERE type = 'operations';

UPDATE agents SET 
  task_type = 'security',
  capabilities = ARRAY['vulnerability_scan', 'security_audit', 'compliance_review', 'threat_analysis', 'security_report']
WHERE type = 'security';

UPDATE agents SET 
  task_type = 'hacking',
  capabilities = ARRAY['penetration_test', 'bug_bounty', 'security_assessment', 'exploit_test', 'red_team']
WHERE type = 'security';

UPDATE agents SET 
  task_type = 'finance',
  capabilities = ARRAY['tax_planning', 'tax_optimization', 'financial_structure', 'international_tax', 'compliance']
WHERE type = 'finance';
