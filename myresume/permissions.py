from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions_SAFE_METHODS:
			return True

		return False