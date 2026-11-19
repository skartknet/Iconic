using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace Our.Iconic.Migrations
{
    public sealed class IconicMigrationComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
            => builder.AddNotificationAsyncHandler<UmbracoApplicationStartedNotification, IconicDataTypeMigration>();
    }
}
