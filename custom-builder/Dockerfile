FROM registry.access.redhat.com/ubi8/ubi:8.0
LABEL io.k8s.description="My custom Builder" \
 io.k8s.display-name="Nginx 1.6.3" \
 io.openshift.expose-services="8080:http" \
 io.openshift.tags="builder,webserver,html,nginx" \
 io.openshift.s2i.scripts-url="image:///usr/libexec/s2i"
RUN yum install -y --nodocs nginx && \
 yum clean all
EXPOSE 8080
COPY ./s2i/bin/ /usr/libexec/s2i