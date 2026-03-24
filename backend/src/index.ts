export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register() {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Check if sample data already exists
    const projectCount = await strapi.db.query('api::project.project').count();
    const serviceCount = await strapi.db.query('api::service.service').count();

    // Only add sample data if none exists
    if (projectCount === 0 && serviceCount === 0) {
      console.log('🚀 Adding sample data...');

      try {
        // Add sample project
        const project = await strapi.db.query('api::project.project').create({
          data: {
            title: 'Modern Office Interior Redesign',
            description: 'Complete interior redesign of a 5,000 sq ft office space with open floor plan, collaborative workspaces, and modern amenities. Project includes full construction management with 5-phase milestone tracking.',
            category: 'Commercial',
            location: 'Chicago, IL',
            status: 'In Progress',
            client: 'TechCorp Solutions Inc.',
            area: 5000,
            budget: 250000,
            startDate: '2026-01-15',
            completionDate: '2026-06-30',
            publishedAt: new Date(),
          },
        });
        console.log('✅ Sample project created:', project.title);

        // Add sample services
        const services = [
          {
            title: 'Interior Design',
            description: 'Complete interior design services for residential and commercial spaces, including space planning, material selection, and 3D visualization.',
            category: 'Both',
            icon: '🏠',
          },
          {
            title: 'Space Planning',
            description: 'Optimize your space with professional layout planning and furniture arrangement for maximum functionality.',
            category: 'Both',
            icon: '📐',
          },
          {
            title: 'Construction Management',
            description: 'End-to-end construction project management with milestone tracking and quality control.',
            category: 'Commercial',
            icon: '🏗️',
          },
          {
            title: 'Residential Design',
            description: 'Custom home design services for 2-7 bedroom apartments with modern aesthetics.',
            category: 'Residential',
            icon: '🏡',
          },
        ];

        for (const service of services) {
          await strapi.db.query('api::service.service').create({
            data: {
              ...service,
              publishedAt: new Date(),
            },
          });
          console.log('✅ Service created:', service.title);
        }

        console.log('🎉 Sample data added successfully!');
      } catch (error) {
        console.error('❌ Error adding sample data:', error);
      }
    } else {
      console.log('ℹ️  Sample data already exists, skipping...');
    }

    // Configure public permissions
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        // Get all permissions for public role
        const permissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
          where: { role: publicRole.id },
        });

        // Enable find and findOne for project and service
        const permissionsToEnable = [
          'api::project.project.find',
          'api::project.project.findOne',
          'api::service.service.find',
          'api::service.service.findOne',
        ];

        for (const permissionAction of permissionsToEnable) {
          const permission = permissions.find(p => p.action === permissionAction);
          if (permission && !permission.enabled) {
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: permission.id },
              data: { enabled: true },
            });
            console.log('✅ Enabled permission:', permissionAction);
          }
        }

        console.log('🎉 Public permissions configured!');
      }
    } catch (error) {
      console.error('❌ Error configuring permissions:', error);
    }
  },
};

// Made with Bob
