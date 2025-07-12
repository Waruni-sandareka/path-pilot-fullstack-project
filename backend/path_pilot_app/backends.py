from django.contrib.auth import get_user_model
import logging

logger = logging.getLogger(__name__)

class EmailBackend:
    def authenticate(self, request, username=None, password=None, **kwargs):
        logger.info(f"🔍 EmailBackend authenticate called with username: {username}, password: {password}")
        User = get_user_model()
        try:
            user = User.objects.get(email=username)
            logger.info(f"🔍 Found user: {user.email}")
            if user.check_password(password):
                logger.info(f"🔓 Password matched for user: {user.email}")
                return user
            logger.warning(f"🔒 Password mismatch for user: {user.email}")
            return None
        except User.DoesNotExist:
            logger.warning(f"🔍 User with email {username} not found")
            return None

    def get_user(self, user_id):
        logger.info(f"🔍 EmailBackend get_user called with user_id: {user_id}")
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            logger.warning(f"🔍 User with id {user_id} not found")
            return None