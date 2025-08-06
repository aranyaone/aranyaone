import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { topic, type, complexity = 'medium' } = await request.json();

    if (!topic) {
      return NextResponse.json({
        success: false,
        error: 'Topic is required'
      }, { status: 400 });
    }

    // AI Mind Map Generation Logic
    const generateMindMapData = (topic, type, complexity) => {
      const templates = {
        business: {
          central: topic,
          branches: [
            { text: 'Market Analysis', color: '#3B82F6', children: ['Target Audience', 'Competitors', 'Market Size'] },
            { text: 'Strategy', color: '#10B981', children: ['Goals', 'Objectives', 'KPIs'] },
            { text: 'Operations', color: '#F59E0B', children: ['Processes', 'Resources', 'Timeline'] },
            { text: 'Financial', color: '#EF4444', children: ['Budget', 'Revenue', 'Costs'] },
            { text: 'Marketing', color: '#8B5CF6', children: ['Channels', 'Campaigns', 'Brand'] },
            { text: 'Team', color: '#06B6D4', children: ['Roles', 'Skills', 'Culture'] }
          ]
        },
        learning: {
          central: topic,
          branches: [
            { text: 'Fundamentals', color: '#3B82F6', children: ['Core Concepts', 'Basic Principles', 'Foundation'] },
            { text: 'Practical Skills', color: '#10B981', children: ['Hands-on Practice', 'Projects', 'Applications'] },
            { text: 'Advanced Topics', color: '#F59E0B', children: ['Expert Level', 'Specialization', 'Research'] },
            { text: 'Resources', color: '#EF4444', children: ['Books', 'Courses', 'Mentors'] },
            { text: 'Practice', color: '#8B5CF6', children: ['Exercises', 'Challenges', 'Real Projects'] },
            { text: 'Assessment', color: '#06B6D4', children: ['Tests', 'Portfolio', 'Feedback'] }
          ]
        },
        project: {
          central: topic,
          branches: [
            { text: 'Planning', color: '#3B82F6', children: ['Requirements', 'Scope', 'Timeline'] },
            { text: 'Design', color: '#10B981', children: ['Architecture', 'UI/UX', 'Wireframes'] },
            { text: 'Development', color: '#F59E0B', children: ['Frontend', 'Backend', 'Testing'] },
            { text: 'Resources', color: '#EF4444', children: ['Team', 'Budget', 'Tools'] },
            { text: 'Risk Management', color: '#8B5CF6', children: ['Risks', 'Mitigation', 'Contingency'] },
            { text: 'Delivery', color: '#06B6D4', children: ['Deployment', 'Documentation', 'Support'] }
          ]
        },
        creative: {
          central: topic,
          branches: [
            { text: 'Inspiration', color: '#3B82F6', children: ['Research', 'References', 'Mood Board'] },
            { text: 'Concepts', color: '#10B981', children: ['Ideas', 'Themes', 'Variations'] },
            { text: 'Execution', color: '#F59E0B', children: ['Tools', 'Techniques', 'Process'] },
            { text: 'Feedback', color: '#EF4444', children: ['Review', 'Iterate', 'Refine'] },
            { text: 'Presentation', color: '#8B5CF6', children: ['Format', 'Audience', 'Medium'] },
            { text: 'Implementation', color: '#06B6D4', children: ['Production', 'Distribution', 'Marketing'] }
          ]
        },
        goals: {
          central: topic,
          branches: [
            { text: 'Vision', color: '#3B82F6', children: ['Long-term', 'Purpose', 'Values'] },
            { text: 'Objectives', color: '#10B981', children: ['SMART Goals', 'Milestones', 'Targets'] },
            { text: 'Action Plan', color: '#F59E0B', children: ['Tasks', 'Steps', 'Timeline'] },
            { text: 'Resources', color: '#EF4444', children: ['Skills', 'Tools', 'Support'] },
            { text: 'Tracking', color: '#8B5CF6', children: ['Metrics', 'Progress', 'Review'] },
            { text: 'Rewards', color: '#06B6D4', children: ['Incentives', 'Celebration', 'Recognition'] }
          ]
        },
        team: {
          central: topic,
          branches: [
            { text: 'Structure', color: '#3B82F6', children: ['Hierarchy', 'Reporting', 'Departments'] },
            { text: 'Roles', color: '#10B981', children: ['Responsibilities', 'Accountability', 'Authority'] },
            { text: 'Skills', color: '#F59E0B', children: ['Competencies', 'Training', 'Development'] },
            { text: 'Communication', color: '#EF4444', children: ['Channels', 'Meetings', 'Tools'] },
            { text: 'Culture', color: '#8B5CF6', children: ['Values', 'Behaviors', 'Environment'] },
            { text: 'Performance', color: '#06B6D4', children: ['Goals', 'Evaluation', 'Improvement'] }
          ]
        }
      };

      const template = templates[type] || templates.business;
      
      // Generate node coordinates
      const nodes = [];
      const centerX = 400;
      const centerY = 300;
      
      // Central node
      nodes.push({
        id: 'root',
        x: centerX,
        y: centerY,
        text: template.central,
        level: 0,
        color: '#8B5CF6',
        shape: 'star',
        connections: template.branches.map((_, i) => `branch-${i}`)
      });
      
      // Branch nodes
      template.branches.forEach((branch, i) => {
        const angle = (i * 2 * Math.PI) / template.branches.length;
        const radius = 150;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        nodes.push({
          id: `branch-${i}`,
          x,
          y,
          text: branch.text,
          level: 1,
          color: branch.color,
          shape: 'circle',
          connections: branch.children.map((_, j) => `sub-${i}-${j}`)
        });
        
        // Sub-nodes
        branch.children.forEach((child, j) => {
          const subAngle = angle + (j - 1) * 0.3;
          const subRadius = 100;
          const subX = x + Math.cos(subAngle) * subRadius;
          const subY = y + Math.sin(subAngle) * subRadius;
          
          nodes.push({
            id: `sub-${i}-${j}`,
            x: subX,
            y: subY,
            text: child,
            level: 2,
            color: branch.color,
            shape: 'circle',
            connections: []
          });
        });
      });
      
      return nodes;
    };

    const mindMapData = generateMindMapData(topic, type, complexity);
    
    // AI Suggestions based on topic
    const suggestions = [
      `Add SWOT analysis for ${topic}`,
      `Include timeline for ${topic} implementation`,
      `Connect related concepts in ${topic}`,
      `Add visual icons for ${topic} elements`,
      `Group similar ${topic} ideas together`,
      `Consider stakeholders for ${topic}`,
      `Add success metrics for ${topic}`,
      `Include risk factors for ${topic}`
    ];

    return NextResponse.json({
      success: true,
      data: {
        nodes: mindMapData,
        title: `AI Mind Map: ${topic}`,
        suggestions: suggestions.slice(0, 5),
        metadata: {
          type,
          complexity,
          created: new Date().toISOString(),
          nodeCount: mindMapData.length,
          levels: Math.max(...mindMapData.map(n => n.level)) + 1
        }
      }
    });

  } catch (error) {
    console.error('Mind map generation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate mind map'
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'templates') {
      const templates = [
        {
          id: 'business',
          name: 'Business Strategy',
          description: 'Comprehensive business planning and strategy development',
          category: 'Business',
          complexity: 'medium',
          estimated_time: '30-60 minutes'
        },
        {
          id: 'learning',
          name: 'Learning Path',
          description: 'Structured approach to learning new skills and knowledge',
          category: 'Education',
          complexity: 'easy',
          estimated_time: '15-30 minutes'
        },
        {
          id: 'project',
          name: 'Project Planning',
          description: 'Complete project breakdown and management structure',
          category: 'Management',
          complexity: 'hard',
          estimated_time: '45-90 minutes'
        },
        {
          id: 'creative',
          name: 'Creative Process',
          description: 'Creative workflow and idea development framework',
          category: 'Creative',
          complexity: 'medium',
          estimated_time: '20-45 minutes'
        },
        {
          id: 'goals',
          name: 'Goal Setting',
          description: 'Personal and professional goal achievement planning',
          category: 'Personal',
          complexity: 'easy',
          estimated_time: '15-30 minutes'
        },
        {
          id: 'team',
          name: 'Team Organization',
          description: 'Team structure, roles, and collaboration framework',
          category: 'HR',
          complexity: 'medium',
          estimated_time: '30-60 minutes'
        }
      ];

      return NextResponse.json({
        success: true,
        data: templates
      });
    }

    return NextResponse.json({
      success: true,
      message: 'AI Mind Map API is running',
      endpoints: {
        'POST /': 'Generate AI mind map',
        'GET /?action=templates': 'Get available templates'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: 'API request failed'
    }, { status: 500 });
  }
}
